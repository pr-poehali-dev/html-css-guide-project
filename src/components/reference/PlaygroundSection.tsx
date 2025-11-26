import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface PlaygroundSectionProps {
  liveHtml: string;
  liveCss: string;
  onHtmlChange: (html: string) => void;
  onCssChange: (css: string) => void;
}

export default function PlaygroundSection({
  liveHtml,
  liveCss,
  onHtmlChange,
  onCssChange
}: PlaygroundSectionProps) {
  const renderPreview = () => {
    return (
      <div className="h-full bg-white rounded-lg overflow-hidden">
        <style>{liveCss}</style>
        <div dangerouslySetInnerHTML={{ __html: liveHtml }} />
      </div>
    );
  };

  return (
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
                    onChange={(e) => onHtmlChange(e.target.value)}
                    className="w-full h-full min-h-[500px] bg-muted text-foreground p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    spellCheck={false}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="css" className="flex-1 mt-4">
                <ScrollArea className="h-[calc(100vh-360px)]">
                  <textarea
                    value={liveCss}
                    onChange={(e) => onCssChange(e.target.value)}
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
  );
}
