import { Zap, Shield, Sparkles, Clock, Users, TrendingUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ContentSections() {
  return (
    <div className="space-y-20 py-20">
      {/* How AI Helps Content Creators */}
      <section id="features" className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            How AI Helps Content Creators
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Discover how artificial intelligence is revolutionizing the creative process
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Lightning-Fast Creation</h3>
              <p className="text-muted-foreground">
                Generate high-quality content in seconds instead of hours. AI tools analyze your requirements and produce professional results instantly, allowing you to focus on strategy and creativity.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Enhanced Creativity</h3>
              <p className="text-muted-foreground">
                Break through creative blocks with AI-powered suggestions and variations. Explore multiple concepts quickly and discover unique angles you might not have considered.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Consistent Quality</h3>
              <p className="text-muted-foreground">
                Maintain professional standards across all your content. AI ensures consistency in tone, style, and quality, helping you build a strong and recognizable brand identity.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Time Efficiency</h3>
              <p className="text-muted-foreground">
                Automate repetitive tasks and streamline your workflow. Spend less time on production and more time on strategic planning and audience engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Benefits of AI Tools
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Transform your creative workflow with powerful advantages
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-start p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Scale Your Content Production</h3>
                <p className="text-muted-foreground">
                  Create more content without sacrificing quality. AI tools enable solo creators and small teams to produce at the scale of large organizations, helping you reach wider audiences and grow faster.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data-Driven Optimization</h3>
                <p className="text-muted-foreground">
                  Leverage AI insights to understand what resonates with your audience. Get recommendations based on trending topics, optimal posting times, and engagement patterns to maximize your content's impact.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Professional Results, No Expertise Required</h3>
                <p className="text-muted-foreground">
                  Access professional-grade tools without years of training. AI democratizes content creation, allowing anyone with a vision to produce stunning videos, graphics, and written content that rivals expert work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Placeholder - In-content */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
            <p className="text-xs text-muted-foreground">Advertisement Space - 728x90</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Everything you need to know about our AI tools
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border/50 rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                How do AI tools work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our AI tools use advanced machine learning models trained on vast datasets to understand your requirements and generate high-quality content. Simply provide a description or prompt, and the AI analyzes it to create relevant, professional output tailored to your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border/50 rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Is the generated content unique?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Each generation is unique and created specifically for your prompt. The AI doesn't copy existing content but creates original material based on patterns it has learned. However, we always recommend reviewing and customizing the output to match your brand voice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border/50 rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Do I need technical skills to use these tools?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Not at all! Our tools are designed to be user-friendly and accessible to everyone. Simply describe what you want in plain language, and the AI handles the technical complexity. No coding, design, or video editing experience required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border/50 rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Can I use the generated content commercially?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, you have full rights to use the content generated by our tools for commercial purposes. This includes social media posts, marketing materials, client projects, and more. The content is yours to use as you see fit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border/50 rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                How long does it take to generate content?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most content is generated in just a few seconds! Complex requests like videos may take slightly longer, but you'll typically have your results in under a minute. This is significantly faster than traditional content creation methods.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-border/50 rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                What if I'm not satisfied with the results?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can regenerate content as many times as you need! Try adjusting your prompt with more specific details or different keywords to get better results. The more descriptive you are, the better the AI can understand and deliver what you're looking for.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
