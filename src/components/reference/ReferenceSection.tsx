import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReferenceItem {
  name: string;
  description: string;
  example: string;
  category: string;
  values?: string;
}

interface ReferenceSectionProps {
  title: string;
  items: ReferenceItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showValues?: boolean;
}

export default function ReferenceSection({
  title,
  items,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showValues = false
}: ReferenceSectionProps) {
  const categories = useMemo(() => {
    const cats = ['Все', ...new Set(items.map(item => item.category))];
    return cats;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-1">Найдено: {filteredItems.length} из {items.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-80"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.name} className="p-6 hover:border-primary transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <code className="text-xl font-bold text-primary">{item.name}</code>
                <Badge variant="secondary">{item.category}</Badge>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm text-foreground overflow-x-auto">
                  <code>{item.example}</code>
                </pre>
              </div>
              {showValues && item.values && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">Значения:</span> {item.values}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
