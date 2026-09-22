// ---------------------------------------------------------------------------
// General, Operon-independent industry research for the deep-dive pages.
//
// Every figure below was retrieved in September 2026 from a named public source
// and is linked on the page. Nothing here is an Operon claim, and no figure is
// presented as an outcome of Operon 360. Wording is paraphrased, not quoted.
//
// Where publishers disagree (market-size estimates especially) the range is
// shown rather than one number picked. Refresh before each major release:
// MoSPI reports are monthly; market-size reports update annually.
//
// Shape per industry:
//   stats     4 headline figures      { value, label, source }
//   shaping   3 forces at work today  { title, text, source }
//   evidence  what independent research says about the coordination gap
//             { title, text, source }
//   caveat    optional note on data quality
// ---------------------------------------------------------------------------

export const RESEARCH_AS_OF = 'September 2026';

const src = (name, url) => ({ name, url });

export const INDUSTRY_RESEARCH = {
  construction: {
    stats: [
      {
        value: 'US$0.63–0.75 tn',
        label: 'Estimated size of India’s construction market in 2025. Publishers’ estimates differ; this is the range across the reports reviewed.',
        source: src('Mordor Intelligence', 'https://www.mordorintelligence.com/industry-reports/india-construction-market'),
      },
      {
        value: '56.8%',
        label: 'Share of construction activity in 2025 that is publicly funded, led by highways, railways, metros and urban projects.',
        source: src('IMARC Group', 'https://www.imarcgroup.com/india-construction-market'),
      },
      {
        value: '35–40%',
        label: 'Share of organised-sector revenue captured by the ten largest EPC groups. A long tail of regional contractors handles the rest.',
        source: src('Mordor Intelligence', 'https://www.mordorintelligence.com/industry-reports/india-construction-market'),
      },
      {
        value: '1% vs 2.8%',
        label: 'Yearly labour-productivity growth in global construction versus the world economy over two decades.',
        source: src('McKinsey Global Institute, 2017', 'https://www.mckinsey.com/~/media/McKinsey/Industries/Capital%20Projects%20and%20Infrastructure/Our%20Insights/Reinventing%20construction%20through%20a%20productivity%20revolution/MGI-Reinventing-construction-A-route-to-higher-productivity-Full-report.pdf'),
      },
    ],
    shaping: [
      {
        title: 'Public spending sets the pace',
        text: 'The Union Budget for 2026–27 lifts public capital expenditure to ₹12.2 lakh crore, up from ₹2 lakh crore in 2014–15. Order books for contractors follow that pipeline.',
        source: src('PIB, Union Budget 2026–27', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2221455&lang=1&reg=3'),
      },
      {
        title: 'New asset types add new parties',
        text: 'Data centres, semiconductor plants and renewable-energy sites bring specialist consultants, equipment suppliers and regulators into projects that used to involve far fewer of them.',
        source: src('Mordor Intelligence, construction consulting', 'https://www.mordorintelligence.com/industry-reports/india-construction-consulting-market'),
      },
      {
        title: 'Cost inputs are volatile',
        text: 'Swings in steel and cement prices, together with a shortage of certified cost engineers, are squeezing project margins and raising the value of accurate, timely cost tracking.',
        source: src('Mordor Intelligence, construction consulting', 'https://www.mordorintelligence.com/industry-reports/india-construction-consulting-market'),
      },
    ],
    evidence: [
      {
        title: 'Fragmentation is the documented cause, not an accident',
        text: 'McKinsey’s global study attributes the sector’s weak productivity to fragmentation, contracts that allocate risk poorly, and owners who struggle to navigate an opaque marketplace, all of which lead to poor project management and execution.',
        source: src('McKinsey Global Institute, 2017', 'https://www.mckinsey.com/~/media/McKinsey/Industries/Capital%20Projects%20and%20Infrastructure/Our%20Insights/Reinventing%20construction%20through%20a%20productivity%20revolution/MGI-Reinventing-construction-A-route-to-higher-productivity-Full-report.pdf'),
      },
      {
        title: 'The subcontractor layer performs worst',
        text: 'The same study finds that large heavy-construction firms are 20 to 40 percent more productive than the many small firms in specialised trades that work as subcontractors, which is where day-to-day coordination happens.',
        source: src('McKinsey Global Institute, 2017', 'https://www.mckinsey.com/~/media/mckinsey/business%20functions/operations/our%20insights/reinventing%20construction%20through%20a%20productivity%20revolution/mgi-reinventing-construction-in-brief.pdf'),
      },
      {
        title: 'Late and over budget is the norm on large projects',
        text: 'McKinsey’s work on capital projects reports that the average large project finishes about 20 months late and 80 percent over budget, and links part of this to how slowly owners, contractors and subcontractors adopt shared digital tools.',
        source: src('McKinsey, capital projects', 'https://www.mckinsey.com/capabilities/operations/our-insights/navigating-the-digital-future-the-disruption-of-capital-projects'),
      },
    ],
    caveat: 'The McKinsey figures are global and several years old; they describe the pattern, not India’s current numbers.',
  },

  retail: {
    stats: [
      {
        value: 'US$952 bn',
        label: 'Size of India’s retail market in 2024, projected to pass US$1.6 trillion by 2030.',
        source: src('IBEF, Indian retail industry', 'https://www.ibef.org/industry/indian-retail-industry-analysis-presentation'),
      },
      {
        value: 'US$132 bn → 230 bn',
        label: 'Expected growth of organised retail between 2024 and 2030, taking it past 35% of the total market.',
        source: src('IBEF, citing Deloitte–RAI', 'https://www.ibef.org/industry/retail-india'),
      },
      {
        value: '16.6 mn sq ft',
        label: 'New mall space expected across India’s seven largest cities by the end of 2026.',
        source: src('IBEF, citing Anarock', 'https://www.ibef.org/industry/retail-india'),
      },
      {
        value: '~19,340',
        label: 'Stores operated by Reliance Retail, India’s largest retailer, as of February 2026.',
        source: src('IBEF, Indian retail industry', 'https://www.ibef.org/archives/industry/indian-retail-industry-analysis-reports/indian-retail-industry-analysis-presentation'),
      },
    ],
    shaping: [
      {
        title: 'Organised formats keep taking share',
        text: 'Malls, chains and e-commerce are growing faster than neighbourhood stores. Each new format means new outlets that have to be designed, built and fitted out on a schedule.',
        source: src('IBEF, citing Deloitte–RAI', 'https://www.ibef.org/industry/retail-india'),
      },
      {
        title: 'Growth is moving to smaller cities',
        text: 'Tier-II and Tier-III cities are expected to add close to 100 million new consumers to branded retail by 2030, while direct-to-consumer brands are opening physical stores across fashion, jewellery, cosmetics and wellness.',
        source: src('IBEF, Indian retail industry', 'https://www.ibef.org/archives/industry/indian-retail-industry-analysis-reports/indian-retail-industry-analysis-presentation'),
      },
      {
        title: 'Mall supply is lumpy',
        text: 'Only about 0.25 million sq ft of new mall space arrived in early 2026 against a pipeline of roughly 46 million sq ft by 2030. Retailers shift to high streets when malls are late, which multiplies the number of separate site projects.',
        source: src('JLL, India retail Q1 2026', 'https://www.jll.com/en-in/insights/market-dynamics/india-retail'),
      },
    ],
    evidence: [
      {
        title: 'A rollout is a programme, not a set of separate jobs',
        text: 'Practitioners describe multi-store rollouts as programmes that need one view across dozens of sites, tight timelines and standard specifications, and note that a delay at one site can disrupt the whole plan.',
        source: src('INGENIOUS.BUILD, 2026', 'https://www.ingenious.build/blog-posts/managing-multi-location-construction-projects-retail'),
      },
      {
        title: 'Many parties, scattered information',
        text: 'A single fit-out involves store operations, designers, contractors, suppliers and landlords. Without one place for communication, approvals slow down and scope gets misunderstood.',
        source: src('Prime Retail Services', 'https://primeretailservices.com/blog/retail-remodel-project-challenges/'),
      },
      {
        title: 'Retailers report weak visibility',
        text: 'Many retailers struggle to see the status and cost of fit-out projects across their whole network at once, which is when new stores open late or cost more than planned.',
        source: src('Smartsheet', 'https://www.smartsheet.com/content-center/managing-work/operations-management/inefficient-retail-rollouts'),
      },
    ],
    caveat: 'Evidence on rollout coordination comes from practitioner sources rather than academic studies, and much of it is from outside India.',
  },

  manufacturing: {
    stats: [
      {
        value: '~17%',
        label: 'Manufacturing’s share of India’s GDP today, against the National Manufacturing Mission’s aim of 25% by 2035.',
        source: src('IBEF, manufacturing sector', 'https://www.ibef.org/industry/manufacturing-sector-india'),
      },
      {
        value: '35.4%',
        label: 'Share of India’s manufacturing output produced by micro, small and medium enterprises.',
        source: src('IBEF, manufacturing presentation', 'https://www.ibef.org/industry/manufactur-presentation'),
      },
      {
        value: '55.0',
        label: 'Manufacturing PMI in May 2026. A reading above 50 signals expansion.',
        source: src('IBEF, manufacturing sector', 'https://www.ibef.org/industry/manufacturing-sector-india'),
      },
      {
        value: '18% / 15%',
        label: 'Share of chief procurement officers formally tracking risk in their direct suppliers, and beyond them, in one global survey.',
        source: src('Deloitte Global CPO Survey, 2021', 'https://www.deloitte.com/us/en/insights/topics/operations/chief-procurement-officer-cpo-survey.html'),
      },
    ],
    shaping: [
      {
        title: 'A national push to scale up',
        text: 'The National Manufacturing Mission, announced in Budget 2025–26, aims to lift manufacturing to 25% of GDP by 2035, create 143 million jobs and expand merchandise exports, building on production-linked incentive schemes.',
        source: src('IBEF, manufacturing sector', 'https://www.ibef.org/industry/manufacturing-sector-india'),
      },
      {
        title: 'Small suppliers carry a large share of output',
        text: 'Because MSMEs make over a third of manufacturing output, a large manufacturer’s supplier base is mostly many small firms, each onboarded, quoted and paid separately.',
        source: src('IBEF, manufacturing presentation', 'https://www.ibef.org/industry/manufactur-presentation'),
      },
      {
        title: 'Payment discipline is now regulated',
        text: 'Since April 2024, buyers can claim a tax deduction for amounts owed to micro and small suppliers only if paid within 15 days, or up to 45 days when a written agreement exists. From April 2026 the same rule sits in the Income-tax Act, 2025.',
        source: src('Busy, Section 43B(h) guide', 'https://busy.in/accounting/section-43bh-msme-payment-rule-and-45-day-limit-explained/'),
      },
    ],
    evidence: [
      {
        title: 'Supplier risk is mostly unmeasured',
        text: 'In Deloitte’s global survey, fewer than one in five procurement leaders formally tracked risk among their direct suppliers, and fewer still had visibility further down the chain.',
        source: src('Deloitte Global CPO Survey, 2021', 'https://www.deloitte.com/us/en/insights/topics/operations/chief-procurement-officer-cpo-survey.html'),
      },
      {
        title: 'The payment rule turns records into a compliance need',
        text: 'Whether a payment was on time, and whether a written agreement existed, decides the tax treatment. Manufacturers therefore need a dated record of what was agreed with each small supplier and when it was paid.',
        source: src('Busy, Section 43B(h) guide', 'https://busy.in/accounting/section-43bh-msme-payment-rule-and-45-day-limit-explained/'),
      },
      {
        title: 'Policy is also targeting supplier liquidity',
        text: 'Budget 2026–27 makes the TReDS invoice-discounting platform mandatory for central public sector enterprises, so that small suppliers are paid against invoices sooner.',
        source: src('IBEF, Union Budget 2026–27', 'https://www.ibef.org/economy/union-budget-2026-27'),
      },
    ],
    caveat: 'The Deloitte survey is global and from 2021. Its figures illustrate supplier-visibility gaps but are not measurements of Indian manufacturers.',
  },

  procurement: {
    stats: [
      {
        value: '20–22%',
        label: 'Share of India’s GDP accounted for by public procurement.',
        source: src('PIB fact sheet', 'https://www.pib.gov.in/factsheetdetails.aspx?id=148586'),
      },
      {
        value: '₹18.4 lakh cr',
        label: 'Cumulative value of purchases on the Government e-Marketplace (GeM) by April 2026, with over ₹5 lakh crore in FY 2025–26.',
        source: src('PIB, April 2026', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2249335&reg=3&lang=2'),
      },
      {
        value: '68% / 47.1%',
        label: 'Share of GeM orders and of GeM value that went to micro and small enterprises in FY 2025–26.',
        source: src('PIB, April 2026', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2249335&reg=3&lang=2'),
      },
      {
        value: '5–16%',
        label: 'Share of targeted savings that organisations lose to buying outside agreed channels, according to Hackett Group research.',
        source: src('Suplari, citing Hackett Group', 'https://suplari.com/blog/how-to-control-maverick-spend'),
      },
    ],
    shaping: [
      {
        title: 'Public buying moved online',
        text: 'GeM replaced a paper-based supplies framework and is mandatory for eligible central purchases. It offers direct purchase, e-bidding and reverse auctions with a digital record of each.',
        source: src('PIB fact sheet', 'https://www.pib.gov.in/factsheetdetails.aspx?id=148586'),
      },
      {
        title: 'Buyers want visibility first',
        text: 'In Deloitte’s 2025 Global CPO Survey, 64 percent of procurement leaders listed greater visibility among their priorities.',
        source: src('Amazon Business, citing Deloitte 2025', 'https://business.amazon.com/en/blog/maverick-spend'),
      },
      {
        title: 'Evidence of savings from structure',
        text: 'A World Bank estimate, summarised by the IMPRI research institute, put median price savings on GeM at about 9.75 percent compared with legacy processes.',
        source: src('IMPRI, on the World Bank estimate', 'https://www.impriindia.com/insights/government-e-marketplacegem/'),
      },
    ],
    evidence: [
      {
        title: 'Off-channel buying is common and takes several forms',
        text: 'Procurement leaders surveyed by Hackett most often report purchases from unapproved suppliers, followed by buying through the wrong channel and outside authorised categories.',
        source: src('Suplari, citing Hackett Group', 'https://suplari.com/blog/how-to-control-maverick-spend'),
      },
      {
        title: 'Visibility gaps reach the supplier base',
        text: 'Deloitte found that few chief procurement officers formally tracked risk even among direct suppliers, which limits how consistently vendors can be compared.',
        source: src('Deloitte Global CPO Survey, 2021', 'https://www.deloitte.com/us/en/insights/topics/operations/chief-procurement-officer-cpo-survey.html'),
      },
      {
        title: 'Even the public sector needed a shared system',
        text: 'The move to a single, transparent digital marketplace for government buying was designed to add auditability and reduce manual steps, which suggests the same need exists in private procurement.',
        source: src('IMPRI', 'https://www.impriindia.com/insights/government-e-marketplacegem/'),
      },
    ],
    caveat: 'The 5–16% and survey figures come from vendor-cited summaries of Hackett and Deloitte research; treat them as directional.',
  },

  'supply-chain': {
    stats: [
      {
        value: '7.97%',
        label: 'India’s logistics cost as a share of GDP in 2023–24 (₹24 lakh crore), the first official systematic estimate.',
        source: src('PIB, NCAER–DPIIT study', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2168995&reg=3&lang=2'),
      },
      {
        value: '17% vs 7.6%',
        label: 'Logistics cost as a share of output for small firms versus large firms.',
        source: src('Outlook Business', 'https://www.outlookbusiness.com/economy-and-policy/indias-logistics-cost-pegged-at-797-pc-of-gdp-in-first-systematic-study'),
      },
      {
        value: '13–14%',
        label: 'The widely repeated older estimate of logistics cost, now replaced by the official figure above.',
        source: src('PIB, NCAER–DPIIT study', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2168995&reg=3&lang=2'),
      },
      {
        value: '₹1.96 vs ₹72',
        label: 'Freight cost per tonne-kilometre by rail versus by air, showing how mode choice changes the bill.',
        source: src('Outlook Business', 'https://www.outlookbusiness.com/economy-and-policy/indias-logistics-cost-pegged-at-797-pc-of-gdp-in-first-systematic-study'),
      },
    ],
    shaping: [
      {
        title: 'A national logistics agenda',
        text: 'The National Logistics Policy, PM Gati Shakti and a network of approved multimodal logistics parks aim to move more freight onto rail and waterways and plan infrastructure across ministries together.',
        source: src('Business Standard', 'https://www.business-standard.com/amp/opinion/columns/confidence-in-india-s-logistics-cost-the-story-of-economic-transition-125112001452_1.html'),
      },
      {
        title: 'Better data has changed the conversation',
        text: 'India’s logistics cost turned out lower than the long-quoted figure, and comparable with the United States and Germany. The challenge is now less about total cost and more about who bears it and how well parties coordinate.',
        source: src('Business Standard', 'https://www.business-standard.com/amp/opinion/columns/confidence-in-india-s-logistics-cost-the-story-of-economic-transition-125112001452_1.html'),
      },
      {
        title: 'Waterways and rail get new investment',
        text: 'Budget 2026–27 announces 20 new National Waterways and seven high-speed rail corridors, adding operators and modes to coordinate across a shipment’s journey.',
        source: src('Invest India, Budget 2026–27', 'https://www.investindia.gov.in/team-india-blogs/indias-union-budget-fy-2026-27-key-highlights'),
      },
    ],
    evidence: [
      {
        title: 'Smaller firms pay more than twice the share',
        text: 'Small firms spend about 17 percent of output on logistics against 7.6 percent for large firms. That gap points to scale and coordination advantages rather than to physical infrastructure alone.',
        source: src('Outlook Business', 'https://www.outlookbusiness.com/economy-and-policy/indias-logistics-cost-pegged-at-797-pc-of-gdp-in-first-systematic-study'),
      },
      {
        title: 'Visibility ends at the first tier',
        text: 'Deloitte’s survey found that only a small minority of procurement leaders tracked risk beyond their direct suppliers, so most multi-tier supply chains run without a shared view.',
        source: src('Deloitte Global CPO Survey, 2021', 'https://www.deloitte.com/us/en/insights/topics/operations/chief-procurement-officer-cpo-survey.html'),
      },
      {
        title: 'Official measurement is itself new',
        text: 'The government describes the 2025 assessment as the first systematic estimate of logistics cost. Until then, policymakers worked from partial datasets, a sign of how little of the system shared common records.',
        source: src('PIB, NCAER–DPIIT study', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2168995&reg=3&lang=2'),
      },
    ],
    caveat: 'Logistics-cost estimates depend heavily on methodology. The official figure is used here; earlier private estimates were higher.',
  },

  infrastructure: {
    stats: [
      {
        value: '₹12.2 lakh cr',
        label: 'Public capital expenditure budgeted for 2026–27, up from about ₹2 lakh crore in 2014–15.',
        source: src('PIB, Union Budget 2026–27', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2221455&lang=1&reg=3'),
      },
      {
        value: '1,775',
        label: 'Central infrastructure projects worth ₹150 crore or more that MoSPI was monitoring in its July 2026 report.',
        source: src('Construction Mirror, citing MoSPI', 'https://constructionmirror.com/infrastructure-projects-face-%E2%82%B93-4-lakh-crore-cost-overrun-mospi/'),
      },
      {
        value: '~10%',
        label: 'Cumulative cost increase across those projects: ₹33.7 lakh crore originally, ₹37.1 lakh crore now (about ₹3.4 lakh crore more).',
        source: src('Construction Mirror, citing MoSPI', 'https://constructionmirror.com/infrastructure-projects-face-%E2%82%B93-4-lakh-crore-cost-overrun-mospi/'),
      },
      {
        value: '993',
        label: 'Road transport and highways projects among those monitored, the largest single ministry share.',
        source: src('Construction Mirror, citing MoSPI', 'https://constructionmirror.com/infrastructure-projects-face-%E2%82%B93-4-lakh-crore-cost-overrun-mospi/'),
      },
    ],
    shaping: [
      {
        title: 'More private capital, more counterparties',
        text: 'Budget 2026–27 proposes an Infrastructure Risk Guarantee Fund and REITs for public-sector real estate, and a ₹17 lakh crore public-private pipeline gives investors visibility of upcoming projects.',
        source: src('KPMG, Budget 2026–27', 'https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2026/02/public-infrastructure-pov-union-budget-2026-27.pdf'),
      },
      {
        title: 'Beyond roads',
        text: 'Seven high-speed rail corridors, 20 new waterways and infrastructure in Tier-II and Tier-III cities widen the range of project types running at the same time.',
        source: src('Invest India, Budget 2026–27', 'https://www.investindia.gov.in/team-india-blogs/indias-union-budget-fy-2026-27-key-highlights'),
      },
      {
        title: 'Progress is real but uneven',
        text: 'About 38 percent of monitored projects have passed 80 percent physical progress, while roughly half of the revised cost has been spent, so most of the capital is still to be deployed.',
        source: src('Construction Mirror, citing MoSPI', 'https://constructionmirror.com/infrastructure-projects-face-%E2%82%B93-4-lakh-crore-cost-overrun-mospi/'),
      },
    ],
    evidence: [
      {
        title: 'Delays are measured in years',
        text: 'In MoSPI’s February 2024 report, 764 of 1,902 monitored projects were delayed, and in an earlier 2022 report the average delay among late projects was over 42 months.',
        source: src('Hindustan Times, citing MoSPI', 'https://www.pressreader.com/india/hindustan-times-ranchi/20240401/281805698939992'),
      },
      {
        title: 'The stated causes are coordination problems',
        text: 'Implementing agencies attribute time overruns to delays in land acquisition, in forest and environment clearances, and to missing infrastructure linkages. Each depends on several parties acting in sequence.',
        source: src('Millennium Post, citing MoSPI', 'https://www.pressreader.com/india/millennium-post-kolkata/20220523/281943136497974'),
      },
      {
        title: 'Even the record is incomplete',
        text: 'In one MoSPI report, hundreds of projects had no reported commissioning date, which shows how hard consistent tracking is across so many agencies.',
        source: src('Deccan Herald, citing MoSPI', 'https://www.deccanherald.com/amp/story/business%2Fmospi-says-431-infra-projects-hit-by-cost-overrun-of-rs-480-lakh-crore-in-january-2909272'),
      },
    ],
    caveat: 'MoSPI figures vary by month and by which projects are counted, and other reports cite different totals. Check the latest monthly report before quoting a number.',
  },

  materials: {
    stats: [
      {
        value: '~453 Mt',
        label: 'India’s cement production in FY 2024–25, with FY 2025–26 estimated near 490 million tonnes.',
        source: src('Mark N Tel Advisors, citing IBEF', 'https://www.marknteladvisors.com/research-library/india-cement-market.html'),
      },
      {
        value: '+10.8%',
        label: 'Growth in finished steel production in FY 2025–26, with crude steel up 11.7%, according to government data.',
        source: src('IMARC, citing government data', 'https://www.openpr.com/news/4606170/india-building-materials-market-analysis-2026-2034-size'),
      },
      {
        value: '51%',
        label: 'Share of India’s steel market revenue that comes from building and construction.',
        source: src('Mordor Intelligence, steel', 'https://www.mordorintelligence.com/industry-reports/india-steel-market'),
      },
      {
        value: '~60%',
        label: 'Combined share of the five largest cement makers, after several years of consolidation.',
        source: src('Mordor Intelligence, cement', 'https://www.mordorintelligence.com/industry-reports/india-cement-market'),
      },
    ],
    shaping: [
      {
        title: 'A capacity build-out is underway',
        text: 'CRISIL expects 160 to 170 million tonnes of new cement grinding capacity between FY 2026 and FY 2028, well above the 95 million tonnes added over the previous three years.',
        source: src('CRISIL Ratings', 'https://www.crisilratings.com/en/home/newsroom/press-releases/2025/11/indias-cement-capacity-addition-to-see-75-percent-jump-over-fiscals-2026-28.html'),
      },
      {
        title: 'Regional oversupply changes bargaining power',
        text: 'In southern India, cement plants run at roughly 60–65 percent utilisation and around 45 local brands compete on price, while large integrated players hold procurement and logistics leverage nationally.',
        source: src('Mordor Intelligence, cement', 'https://www.mordorintelligence.com/industry-reports/india-cement-market'),
      },
      {
        title: 'Digital sourcing platforms are emerging',
        text: 'Several B2B platforms now offer contractors price comparison and supplier verification for steel and cement, a sign that buyers see sourcing as a problem worth paying to solve.',
        source: src('OfBusiness', 'https://www.ofbusiness.com/blog/industry-intelligence/digital-marketplaces-construction-material-sourcing-149274'),
      },
    ],
    evidence: [
      {
        title: 'Price swings squeeze the buyers',
        text: 'Volatile steel and cement prices are cited as a direct pressure on margins across the construction chain, which raises the cost of working from stale quotations.',
        source: src('Mordor Intelligence, construction consulting', 'https://www.mordorintelligence.com/industry-reports/india-construction-consulting-market'),
      },
      {
        title: 'Buying passes through layers',
        text: 'A bulk order commonly involves several vendors, repeated negotiation rounds and informal credit terms, and the material must still meet IS-code standards and carry documented quality certification.',
        source: src('OfBusiness', 'https://www.ofbusiness.com/blog/industry-intelligence/digital-marketplaces-construction-material-sourcing-149274'),
      },
      {
        title: 'Verification is manual',
        text: 'Guidance for buyers recommends checking BIS certification and third-party test reports and reading reviews by hand, because there is no single record of a supplier’s standing.',
        source: src('PropertyKumbh', 'https://propertykumbh.com/news/building-material-suppliers-in-india'),
      },
    ],
    caveat: 'Evidence on sourcing practice comes largely from marketplace operators, who have a commercial interest. Read it as description of the buyer’s problem, not as proof of any platform’s results.',
  },
};
