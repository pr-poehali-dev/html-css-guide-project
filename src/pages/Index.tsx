import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import HomePage from '@/components/reference/HomePage';
import ReferenceSection from '@/components/reference/ReferenceSection';
import PlaygroundSection from '@/components/reference/PlaygroundSection';
import { htmlTags, cssProperties, examples } from '@/components/reference/data';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHtmlCategory, setSelectedHtmlCategory] = useState('Все');
  const [selectedCssCategory, setSelectedCssCategory] = useState('Все');
  const [liveHtml, setLiveHtml] = useState('<div style="padding: 20px; text-align: center;">\n  <h1>Привет, мир!</h1>\n  <p>Редактируй HTML и CSS слева</p>\n</div>');
  const [liveCss, setLiveCss] = useState('body {\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #9b87f5;\n}\n\np {\n  color: #f0ebff;\n}');

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Code2" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">HTML & CSS Справочник</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
              >
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button
                variant={activeSection === 'html' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('html')}
              >
                <Icon name="FileCode" size={18} className="mr-2" />
                HTML
              </Button>
              <Button
                variant={activeSection === 'css' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('css')}
              >
                <Icon name="Palette" size={18} className="mr-2" />
                CSS
              </Button>
              <Button
                variant={activeSection === 'examples' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('examples')}
              >
                <Icon name="Lightbulb" size={18} className="mr-2" />
                Примеры
              </Button>
              <Button
                variant={activeSection === 'playground' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('playground')}
              >
                <Icon name="Play" size={18} className="mr-2" />
                Песочница
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {activeSection === 'home' && (
          <HomePage onNavigate={setActiveSection} />
        )}

        {activeSection === 'html' && (
          <ReferenceSection
            title="HTML-теги"
            items={htmlTags}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedHtmlCategory}
            onCategoryChange={setSelectedHtmlCategory}
          />
        )}

        {activeSection === 'css' && (
          <ReferenceSection
            title="CSS-свойства"
            items={cssProperties}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCssCategory}
            onCategoryChange={setSelectedCssCategory}
            showValues={true}
          />
        )}

        {activeSection === 'examples' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Готовые примеры</h2>
            <div className="space-y-6">
              {examples.map((example, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">{example.title}</h3>
                  <Tabs defaultValue="html" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-3">
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                      <TabsTrigger value="preview">Результат</TabsTrigger>
                    </TabsList>
                    <TabsContent value="html" className="mt-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{example.html}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="css" className="mt-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{example.css}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="mt-4">
                      <div className="bg-white p-6 rounded-lg">
                        <style>{example.css}</style>
                        <div dangerouslySetInnerHTML={{ __html: example.html }} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'playground' && (
          <PlaygroundSection
            liveHtml={liveHtml}
            liveCss={liveCss}
            onHtmlChange={setLiveHtml}
            onCssChange={setLiveCss}
          />
        )}
      </main>
    </div>
  );
}
