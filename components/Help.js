import React from "react";

const Help = () => {
  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-slate-900 text-center mb-10">Help & Support</h1>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <details className="bg-slate-50 p-6 rounded-lg shadow-md border border-slate-200">
            <summary className="font-medium text-slate-800">How do I report a lost item?</summary>
            <p className="mt-3 text-slate-600">
              Navigate to the "Submit Lost Item" section and fill out the necessary details to report a lost item.
            </p>
          </details>

          <details className="bg-slate-50 p-6 rounded-lg shadow-md border border-slate-200">
            <summary className="font-medium text-slate-800">How do I report a found item?</summary>
            <p className="mt-3 text-slate-600">
              Visit the "Submit Found Item" section, provide the details, and our team will help reconnect the item with its owner.
            </p>
          </details>

          <details className="bg-slate-50 p-6 rounded-lg shadow-md border border-slate-200">
            <summary className="font-medium text-slate-800">How can I contact customer support?</summary>
            <p className="mt-3 text-slate-600">
              You can contact support via email at <a href="mailto:support@findyfy.com" className="text-indigo-600 hover:underline">support@findyfy.com</a>, or use the contact form in the "Contact Us" section.
            </p>
          </details>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Contact Support</h2>
        <p className="mb-6 text-slate-700">
          If you need further assistance, please feel free to contact our support team via email.
        </p>
        <div className="bg-slate-50 p-6 rounded-lg shadow-md border border-slate-200">
          <h3 className="font-medium mb-3 text-slate-800">Email:</h3>
          <a href="mailto:support@findyfy.com" className="text-indigo-600 hover:underline">support@findyfy.com</a>
          <p className="mt-4 text-slate-600">We will respond within 24 hours.</p>
        </div>
      </section>

      {/* Other Help Topics Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Other Help Topics</h2>
        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li>How to update your account information</li>
          <li>Privacy policy and terms of service</li>
          <li>What to do if you find suspicious activity</li>
        </ul>
      </section>
    </div>
  );
};

export default Help;
