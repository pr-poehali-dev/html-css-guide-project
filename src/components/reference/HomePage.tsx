import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { htmlTags, cssProperties } from './data';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-12">
        <h2 className="text-5xl font-bold text-foreground">Полный справочник по HTML и CSS</h2>
        <p className="text-xl text-muted-foreground">
          Изучай, экспериментируй и создавай с интерактивными примерами
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 hover:border-primary transition-colors cursor-pointer" onClick={() => onNavigate('html')}>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Icon name="FileCode" size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold">HTML-теги</h3>
            <p className="text-muted-foreground">
              {htmlTags.length} HTML-тегов с описаниями и примерами
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:border-primary transition-colors cursor-pointer" onClick={() => onNavigate('css')}>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Icon name="Palette" size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold">CSS-свойства</h3>
            <p className="text-muted-foreground">
              {cssProperties.length} CSS-свойств для стилизации
            </p>
          </div>
        </Card>

        <Card className="p-6 hover:border-primary transition-colors cursor-pointer" onClick={() => onNavigate('playground')}>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Icon name="Play" size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Песочница</h3>
            <p className="text-muted-foreground">
              Пиши код и смотри результат в реальном времени
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50">
        <div className="flex items-start gap-4">
          <Icon name="BookOpen" size={32} className="text-primary flex-shrink-0" />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Справка для начинающих</h3>
            <p className="text-foreground/80 mb-4">
              HTML — это язык разметки, который определяет структуру веб-страницы. 
              CSS — это язык стилей, который определяет внешний вид элементов.
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span>HTML теги создают структуру: заголовки, параграфы, ссылки, изображения</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span>CSS свойства стилизуют элементы: цвета, размеры, отступы, анимации</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Используйте песочницу для экспериментов и практики</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
