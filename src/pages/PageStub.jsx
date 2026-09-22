import { Container, Display, MonoLabel, Reveal, Section, Body } from '../components/ui';

/**
 * Placeholder for a route whose content ships in a later batch. Every route in
 * the sitemap exists and is navigable from Batch 0, so link integrity can be
 * checked before any page copy is written.
 */
export default function PageStub({ title = 'Page', path = '/', shell = 'corporate', nav = 'primary', batch = 1 }) {
  const dark = shell === 'o360';
  return (
    <Section surface={dark ? 'ink' : 'paper'}>
      <Container>
        <Reveal>
          <MonoLabel tone={dark ? 'paper' : 'ink'}>{path}</MonoLabel>
          <Display level={1} className="mt-6">
            {title}
          </Display>
          <Body tone={dark ? 'paper' : 'ink'} className="mt-8">
            This route is wired and navigable. Page content lands in batch {batch}.
          </Body>
          <div className={`mt-10 inline-flex items-center gap-3 border-t pt-4 ${dark ? 'border-paper-14' : 'border-ink-14'}`}>
            <MonoLabel tone={dark ? 'paper' : 'ink'}>
              {shell === 'o360' ? 'Operon 360' : 'Operon Softwares'} · nav: {nav} · batch {batch}
            </MonoLabel>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
