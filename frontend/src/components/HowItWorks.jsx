import './HowItWorks.css';

const steps = [
  {
    number: '01',
    title: 'Find a property',
    text: 'Browse homes, self contained units, shops, and land. Open any listing to see full specs and price.',
  },
  {
    number: '02',
    title: 'Create an account and book',
    text: 'Pay a booking fee of 10% of the property price to reserve it while the paperwork is finalized.',
  },
{
    number: '03',
    title: 'Complete or cancel',
    text: 'If the deal closes, your 10% is applied to the balance. If you cancel, a flat 4% is kept as a non-refundable fee — you get the remaining 6% back.',
},
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container how-it-works-inner">
        <h2>How booking works</h2>
        <div className="how-it-works-steps">
          {steps.map((step) => (
            <div className="how-it-works-step" key={step.number}>
              <span className="how-it-works-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}