import { Button, Container, Display, MonoLabel, Section, Body } from '../components/ui';

export default function NotFound() {
  return (
    <Section>
      <Container>
        <MonoLabel>404</MonoLabel>
        <Display level={1} className="mt-6">
          No page at this address.
        </Display>
        <Body className="mt-8">The link may be out of date. Start from the homepage, or ask Search Dog where to go.</Body>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/">Go to homepage</Button>
          <Button to="/contact#general" variant="secondary">
            Get in touch
          </Button>
        </div>
      </Container>
    </Section>
  );
}
