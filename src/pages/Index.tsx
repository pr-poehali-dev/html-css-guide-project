import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const htmlTags = [
  {
    name: '<div>',
    description: 'Контейнер для группировки элементов',
    example: '<div class="container">\n  <p>Содержимое</p>\n</div>',
    category: 'Структура'
  },
  {
    name: '<span>',
    description: 'Строчный контейнер для стилизации текста',
    example: '<span style="color: red;">Красный текст</span>',
    category: 'Структура'
  },
  {
    name: '<h1> - <h6>',
    description: 'Заголовки разных уровней',
    example: '<h1>Главный заголовок</h1>\n<h2>Подзаголовок</h2>',
    category: 'Текст'
  },
  {
    name: '<p>',
    description: 'Параграф текста',
    example: '<p>Это параграф текста.</p>',
    category: 'Текст'
  },
  {
    name: '<a>',
    description: 'Ссылка на другую страницу или ресурс',
    example: '<a href="https://example.com">Ссылка</a>',
    category: 'Медиа'
  },
  {
    name: '<img>',
    description: 'Вставка изображения',
    example: '<img src="image.jpg" alt="Описание">',
    category: 'Медиа'
  },
  {
    name: '<button>',
    description: 'Кнопка для взаимодействия',
    example: '<button onclick="alert(\'Привет!\')">Нажми меня</button>',
    category: 'Формы'
  },
  {
    name: '<input>',
    description: 'Поле ввода данных',
    example: '<input type="text" placeholder="Введите текст">',
    category: 'Формы'
  }
];

const cssProperties = [
  {
    name: 'color',
    description: 'Устанавливает цвет текста',
    example: 'color: #9b87f5;',
    values: 'Цвет (hex, rgb, название)',
    category: 'Текст'
  },
  {
    name: 'background',
    description: 'Задает фон элемента',
    example: 'background: linear-gradient(to right, #9b87f5, #7E69AB);',
    values: 'Цвет, градиент, изображение',
    category: 'Фон'
  },
  {
    name: 'display',
    description: 'Определяет тип отображения элемента',
    example: 'display: flex;',
    values: 'block, inline, flex, grid, none',
    category: 'Layout'
  },
  {
    name: 'margin',
    description: 'Внешние отступы элемента',
    example: 'margin: 20px 10px;',
    values: 'Размер (px, em, rem, %)',
    category: 'Отступы'
  },
  {
    name: 'padding',
    description: 'Внутренние отступы элемента',
    example: 'padding: 15px;',
    values: 'Размер (px, em, rem, %)',
    category: 'Отступы'
  },
  {
    name: 'border',
    description: 'Граница элемента',
    example: 'border: 2px solid #9b87f5;',
    values: 'Толщина, стиль, цвет',
    category: 'Граница'
  },
  {
    name: 'font-size',
    description: 'Размер шрифта',
    example: 'font-size: 16px;',
    values: 'Размер (px, em, rem)',
    category: 'Текст'
  },
  {
    name: 'flex',
    description: 'Гибкое распределение пространства',
    example: 'flex: 1;',
    values: 'Число или значения',
    category: 'Layout'
  }
];

const examples = [
  {
    title: 'Карточка с кнопкой',
    html: '<div class="card">\n  <h3>Заголовок</h3>\n  <p>Описание карточки</p>\n  <button>Действие</button>\n</div>',
    css: '.card {\n  background: #1e1b2e;\n  border: 1px solid #9b87f5;\n  border-radius: 8px;\n  padding: 20px;\n  color: #f0ebff;\n}\n\n.card h3 {\n  margin: 0 0 10px;\n  color: #9b87f5;\n}\n\n.card button {\n  background: #9b87f5;\n  color: #1e1b2e;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n}'
  },
  {
    title: 'Навигационное меню',
    html: '<nav>\n  <a href="#home">Главная</a>\n  <a href="#about">О нас</a>\n  <a href="#contact">Контакты</a>\n</nav>',
    css: 'nav {\n  display: flex;\n  gap: 20px;\n  padding: 15px;\n  background: #1e1b2e;\n  border-bottom: 2px solid #9b87f5;\n}\n\nnav a {\n  color: #f0ebff;\n  text-decoration: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  transition: background 0.3s;\n}\n\nnav a:hover {\n  background: #9b87f5;\n  color: #1e1b2e;\n}'
  },
  {
    title: 'Форма входа',
    html: '<form class="login-form">\n  <h2>Вход</h2>\n  <input type="email" placeholder="Email">\n  <input type="password" placeholder="Пароль">\n  <button type="submit">Войти</button>\n</form>',
    css: '.login-form {\n  max-width: 300px;\n  padding: 30px;\n  background: #1e1b2e;\n  border: 1px solid #9b87f5;\n  border-radius: 12px;\n}\n\n.login-form h2 {\n  margin: 0 0 20px;\n  color: #9b87f5;\n}\n\n.login-form input {\n  width: 100%;\n  padding: 12px;\n  margin-bottom: 15px;\n  background: #2a2640;\n  border: 1px solid #4a4458;\n  border-radius: 6px;\n  color: #f0ebff;\n}\n\n.login-form button {\n  width: 100%;\n  padding: 12px;\n  background: #9b87f5;\n  color: #1e1b2e;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveHtml, setLiveHtml] = useState('<div style="padding: 20px; text-align: center;">\n  <h1>Привет, мир!</h1>\n  <p>Редактируй HTML и CSS слева</p>\n</div>');
  const [liveCss, setLiveCss] = useState('body {\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #9b87f5;\n}\n\np {\n  color: #f0ebff;\n}');

  const filteredHtmlTags = htmlTags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCssProps = cssProperties.filter(prop =>
    prop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPreview = () => {
    return (
      <div className="h-full bg-white rounded-lg overflow-hidden">
        <style>{liveCss}</style>
        <div dangerouslySetInnerHTML={{ __html: liveHtml }} />
      </div>
    );
  };

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
                HTML-теги
              </Button>
              <Button
                variant={activeSection === 'css' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('css')}
              >
                <Icon name="Palette" size={18} className="mr-2" />
                CSS-свойства
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
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4 py-12">
              <h2 className="text-5xl font-bold text-foreground">Полный справочник по HTML и CSS</h2>
              <p className="text-xl text-muted-foreground">
                Изучай, экспериментируй и создавай с интерактивными примерами
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:border-primary transition-colors cursor-pointer" onClick={() => setActiveSection('html')}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Icon name="FileCode" size={40} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">HTML-теги</h3>
                  <p className="text-muted-foreground">
                    Полный каталог HTML-тегов с описаниями и примерами использования
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:border-primary transition-colors cursor-pointer" onClick={() => setActiveSection('css')}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Icon name="Palette" size={40} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">CSS-свойства</h3>
                  <p className="text-muted-foreground">
                    Все CSS-свойства для стилизации ваших веб-страниц
                  </p>
                </div>
              </Card>

              <Card className="p-6 hover:border-primary transition-colors cursor-pointer" onClick={() => setActiveSection('playground')}>
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
        )}

        {activeSection === 'html' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">HTML-теги</h2>
              <div className="w-80">
                <Input
                  placeholder="Поиск тегов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredHtmlTags.map((tag) => (
                <Card key={tag.name} className="p-6 hover:border-primary transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <code className="text-xl font-bold text-primary">{tag.name}</code>
                      <span className="text-sm px-3 py-1 bg-primary/20 rounded-full">{tag.category}</span>
                    </div>
                    <p className="text-muted-foreground">{tag.description}</p>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm text-foreground overflow-x-auto">
                        <code>{tag.example}</code>
                      </pre>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'css' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">CSS-свойства</h2>
              <div className="w-80">
                <Input
                  placeholder="Поиск свойств..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredCssProps.map((prop) => (
                <Card key={prop.name} className="p-6 hover:border-primary transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <code className="text-xl font-bold text-primary">{prop.name}</code>
                      <span className="text-sm px-3 py-1 bg-primary/20 rounded-full">{prop.category}</span>
                    </div>
                    <p className="text-muted-foreground">{prop.description}</p>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm text-foreground overflow-x-auto">
                        <code>{prop.example}</code>
                      </pre>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold">Значения:</span> {prop.values}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
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
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Интерактивная песочница</h2>
            <p className="text-muted-foreground">Пиши код и сразу смотри результат</p>
            
            <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-240px)]">
              <div className="space-y-4">
                <Card className="p-4 h-full flex flex-col">
                  <Tabs defaultValue="html" className="flex-1 flex flex-col">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                    </TabsList>
                    <TabsContent value="html" className="flex-1 mt-4">
                      <ScrollArea className="h-[calc(100vh-360px)]">
                        <textarea
                          value={liveHtml}
                          onChange={(e) => setLiveHtml(e.target.value)}
                          className="w-full h-full min-h-[500px] bg-muted text-foreground p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          spellCheck={false}
                        />
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="css" className="flex-1 mt-4">
                      <ScrollArea className="h-[calc(100vh-360px)]">
                        <textarea
                          value={liveCss}
                          onChange={(e) => setLiveCss(e.target.value)}
                          className="w-full h-full min-h-[500px] bg-muted text-foreground p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          spellCheck={false}
                        />
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Icon name="Eye" size={20} />
                    Предпросмотр
                  </h3>
                </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {renderPreview()}
                </ScrollArea>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
