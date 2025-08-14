import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Play, 
  Save, 
  Bot, 
  Bug, 
  FileCode, 
  Lightbulb, 
  Download, 
  Upload,
  Settings,
  Maximize2,
  RotateCcw
} from 'lucide-react';

interface CodeSession {
  id: string;
  title: string;
  language: string;
  code: string;
}

const LANGUAGE_CONFIGS = {
  javascript: {
    name: 'JavaScript',
    defaultCode: `// Welcome to JavaScript!\nconsole.log("Hello, World!");`,
    runner: 'console.log'
  },
  python: {
    name: 'Python',
    defaultCode: `# Welcome to Python!\nprint("Hello, World!")`,
    runner: 'print'
  },
  java: {
    name: 'Java',
    defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    runner: 'System.out.println'
  },
  cpp: {
    name: 'C++',
    defaultCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
    runner: 'cout'
  },
  csharp: {
    name: 'C#',
    defaultCode: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}`,
    runner: 'Console.WriteLine'
  }
};

interface CodeEditorProps {
  onClose: () => void;
}

const CodeEditor = ({ onClose }: CodeEditorProps) => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(LANGUAGE_CONFIGS.javascript.defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('Untitled Session');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    setCode(LANGUAGE_CONFIGS[language as keyof typeof LANGUAGE_CONFIGS].defaultCode);
  }, [language]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    // Simulate code execution (in real implementation, this would call a backend service)
    setTimeout(() => {
      try {
        if (language === 'javascript') {
          // Simple JavaScript execution simulation
          const logs: string[] = [];
          const originalLog = console.log;
          console.log = (...args) => {
            logs.push(args.map(arg => String(arg)).join(' '));
          };
          
          // Basic evaluation for demo purposes
          if (code.includes('console.log')) {
            const matches = code.match(/console\.log\(([^)]+)\)/g);
            if (matches) {
              matches.forEach(match => {
                const content = match.match(/console\.log\(([^)]+)\)/)?.[1];
                if (content) {
                  try {
                    const result = eval(content);
                    logs.push(String(result));
                  } catch {
                    logs.push(content.replace(/['"]/g, ''));
                  }
                }
              });
            }
          }
          
          console.log = originalLog;
          setOutput(logs.length > 0 ? logs.join('\n') : 'No output');
        } else {
          // Simulate output for other languages
          setOutput(`Output for ${LANGUAGE_CONFIGS[language as keyof typeof LANGUAGE_CONFIGS].name}:\nHello, World!`);
        }
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const saveSession = async () => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from('coding_sessions')
        .upsert([{
          user_id: profile.id,
          title: sessionTitle,
          language,
          code
        }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Code session saved successfully!'
      });
    } catch (error) {
      console.error('Error saving session:', error);
      toast({
        title: 'Error',
        description: 'Failed to save session',
        variant: 'destructive'
      });
    }
  };

  const aiReview = () => {
    toast({
      title: 'AI Review',
      description: 'AI code review feature will analyze your code for improvements and best practices.',
    });
    // This would integrate with an AI service for code review
  };

  const aiDebug = () => {
    toast({
      title: 'AI Debug',
      description: 'AI debugging will help identify and fix issues in your code.',
    });
    // This would integrate with an AI service for debugging
  };

  const resetCode = () => {
    setCode(LANGUAGE_CONFIGS[language as keyof typeof LANGUAGE_CONFIGS].defaultCode);
    setOutput('');
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="text-lg font-semibold bg-transparent border-none outline-none"
                />
                <Badge variant="secondary">
                  {LANGUAGE_CONFIGS[language as keyof typeof LANGUAGE_CONFIGS].name}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsFullscreen(false)}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="flex-1 p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 bg-muted rounded-lg font-mono text-sm resize-none outline-none"
                placeholder={`Write your ${LANGUAGE_CONFIGS[language as keyof typeof LANGUAGE_CONFIGS].name} code here...`}
              />
            </div>

            {/* Output Panel */}
            <div className="w-1/3 border-l border-border p-4">
              <div className="h-full bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">Output</h3>
                <div className="h-full overflow-auto font-mono text-sm whitespace-pre-wrap">
                  {output || 'Run your code to see output here...'}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(LANGUAGE_CONFIGS).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={resetCode}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={aiReview}>
                  <Bot className="h-4 w-4 mr-1" />
                  AI Review
                </Button>
                <Button variant="outline" size="sm" onClick={aiDebug}>
                  <Bug className="h-4 w-4 mr-1" />
                  AI Debug
                </Button>
                <Button variant="outline" size="sm" onClick={saveSession}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button 
                  onClick={runCode} 
                  disabled={isRunning}
                  className="bg-gradient-hero hover:shadow-glow"
                >
                  <Play className="h-4 w-4 mr-1" />
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Code Editor
            </CardTitle>
            <Badge variant="secondary">
              {LANGUAGE_CONFIGS[language as keyof typeof LANGUAGE_CONFIGS].name}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(true)}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LANGUAGE_CONFIGS).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="text"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
              placeholder="Session title"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetCode}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={aiReview}>
              <Bot className="h-4 w-4 mr-1" />
              AI Review
            </Button>
            <Button variant="outline" size="sm" onClick={aiDebug}>
              <Bug className="h-4 w-4 mr-1" />
              AI Debug
            </Button>
            <Button variant="outline" size="sm" onClick={saveSession}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button 
              onClick={runCode} 
              disabled={isRunning}
              className="bg-gradient-hero hover:shadow-glow"
            >
              <Play className="h-4 w-4 mr-1" />
              {isRunning ? 'Running...' : 'Run'}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-96">
          {/* Code Editor */}
          <div className="space-y-2">
            <h3 className="font-semibold">Code</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-muted rounded-lg font-mono text-sm resize-none outline-none"
              placeholder={`Write your ${LANGUAGE_CONFIGS[language as keyof typeof LANGUAGE_CONFIGS].name} code here...`}
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <h3 className="font-semibold">Output</h3>
            <div className="h-full bg-muted rounded-lg p-4 overflow-auto font-mono text-sm whitespace-pre-wrap">
              {output || 'Run your code to see output here...'}
            </div>
          </div>
        </div>

        {/* AI Features Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">AI-Powered Features</h4>
              <p className="text-sm text-muted-foreground">
                Use AI Review to get code quality suggestions and AI Debug to identify and fix issues in your code.
                These features help you learn best practices and improve your programming skills.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;