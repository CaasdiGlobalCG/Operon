import { Link, useLocation } from 'react-router-dom';
import { PageHero } from '../components/blocks';
import { Container, MonoLabel, Reveal, Section } from '../components/ui';
import LegalDocument from '../components/LegalDocument';
import privacyPolicy from '../content/legal/privacy-policy.json';
import termsOfService from '../content/legal/terms-of-service.json';

// `content` is the document text, extracted verbatim from the approved PDFs.
const DOCUMENTS = [
  { title: 'Privacy Policy', path: '/legal/privacy-policy', content: privacyPolicy },
  { title: 'Terms of Service', path: '/legal/terms-of-service', content: termsOfService },
];

export function Legal() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        headline="Legal documents"
        lead="Links to the current version of each document below. Each document shows its own effective date and version number, independent of this index."
      />
      <Section surface="paper">
        <Container width="narrow">
          <Reveal>
            <ul className="border-t border-ink-14">
              {DOCUMENTS.map((doc) => (
                <li key={doc.path} className="border-b border-ink-14">
                  <Link
                    to={doc.path}
                    className="flex items-center justify-between gap-6 py-6 transition-colors duration-180 hover:bg-cloud"
                  >
                    <span className="font-display text-h4 font-semibold">{doc.title}</span>
                    <MonoLabel>{doc.path}</MonoLabel>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

/** Legal document route — renders the full document text through <LegalDocument />. */
export function LegalDoc() {
  const { pathname } = useLocation();
  const doc = DOCUMENTS.find((d) => d.path === pathname) || DOCUMENTS[0];
  return <LegalDocument doc={doc.content} others={DOCUMENTS.filter((d) => d.path !== doc.path)} />;
}
