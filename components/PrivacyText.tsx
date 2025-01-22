export type LegalText = {
	title: string;
	content: string;
	type?: "title";
};

export const PrivacyTextEN: LegalText[] = [
	{
		title: "Privacy Policy",
		type: "title",
		content: `SAKURA (hereinafter referred to as "the Site") considers the protection of customers' personal information to be a vital responsibility. This Privacy Policy explains the types of information we collect, the purposes for which we use it, and how we protect that information.`,
	},
	{
		title: "Retention of Information",
		content: `We may collect personal information that you enter, such as your name, address, phone number, email address, purchase history, and payment information. We may also collect access log information, including IP addresses, browser types, and pages viewed. Your information is retained in accordance with this Privacy Policy or for as long as necessary to provide our services. The collected information is used for purposes such as shipping products and responding to related inquiries, introducing new products or promotional information (only with your consent), improving site operations and service quality, and complying with legal obligations and enforcing our Terms of Use. When your information is no longer necessary, we will safely delete it using appropriate methods.`,
	},
	{
		title: "Provision of Information to Third Parties",
		content: `We do not provide personal information to third parties, except in cases where it is required by law, where we have your consent, or where the provision of information is necessary to outsourced service providers (such as shipping and payment processing companies) within the scope required for their tasks. However, we may use statistical data that does not identify individuals for purposes such as marketing, data analysis, or service personalization.`,
	},
	{
		title: "Security Measures",
		content: `The Site takes appropriate technical and organizational measures to ensure the secure management of your personal information and strives to prevent unauthorized access, loss, alteration, or leakage. We implement security measures such as HTTPS access in most areas of our service and regularly monitor our systems for vulnerabilities. We also use Stripe, a payment platform, for secure payment processing. Stripe is PCI-DSS (Payment Card Industry Data Security Standard) compliant, protecting your payment information under high security standards. However, despite these efforts, complete security cannot be guaranteed. Therefore, we recommend using strong passwords and refraining from sharing highly sensitive information that could lead to serious consequences if leaked. Additionally, internet communications are not always completely secure, and we cannot guarantee absolute protection. In the event of a personal information breach, we will promptly notify affected individuals, take appropriate measures, and report to supervisory authorities if required.`,
	},
	{
		title: "Cookies (Cookie)",
		content: `We do not use cookies on this Site. Therefore, we do not store cookies in your browser or collect personal information through cookies. We do not use cookies for purposes such as improving site convenience or tracking. While the Site currently does not use cookies, we may introduce cookies or similar technologies in the future to enhance your experience. If such a change occurs, we will update this Privacy Policy and provide appropriate notification.`,
	},
	{
		title: "Privacy of Minors",
		content: `We do not intentionally collect personal information from individuals under the age of 13. If a child under 13 years old wishes to use our Site, parental or guardian consent is required. If we discover that information has been provided without parental consent, we will take appropriate measures.`,
	},
	{
		title: "Cookies (Cookie)",
		content: `We do not use cookies on this Site. Therefore, we do not store cookies in your browser or collect personal information through cookies. We do not use cookies for purposes such as improving site convenience or tracking.`,
	},
	{
		title: "General Data Protection Regulation (GDPR)",
		content: `We comply with the General Data Protection Regulation (GDPR) and related data protection laws. If you reside in the European Economic Area (EEA), your personal data will be processed in accordance with GDPR requirements. This may involve obtaining explicit consent and implementing appropriate safeguards when transferring data outside the EEA. If your personal information is transferred to countries outside the EEA, we will adopt EU Standard Contractual Clauses (SCCs) or implement other adequate measures to ensure a sufficient level of data protection. You have the right to request access, correction, deletion, restriction of processing, objection, and data portability regarding the personal information we hold about you. If you wish to exercise these rights, please contact us at the email address provided below.`,
	},
	{
		title: "Policy Updates",
		content: `This Privacy Policy may be updated from time to time for operational, legal, or regulatory reasons. If any significant changes are made, we will notify you through updates on our website or via additional notifications such as banners or emails. We recommend checking this Policy periodically to stay informed about how we protect your information.`,
	},
	{
		title: "Contact Information",
		content: `For inquiries regarding this Privacy Policy, please contact us using the information below.`,
	},
	{
		title: "Email",
		content: `kohei8045@gmail.com`,
	},
];


//------------------ JP  ---------------------
export const PrivacyTextJP: LegalText[] = [
	{
		title: "プライバシーポリシー", type: "title",
		content: `SAKURA（以下、「当サイト」といいます）は、お客様の個人情報の保護を重要な責務と考えています。本プライバシーポリシーでは、当サイトが収集する情報の種類、その利用目的、情報の保護方法について説明します`,
	},
	{
		title: "情報の保持",
		content: `お客様が入力した氏名、住所、電話番号、メールアドレスなどの個人情報、購入履歴や支払いに関する情報、またIPアドレス、ブラウザの種類、閲覧ページなどのアクセスログ情報を収集する場合があります。お客様の情報は本プライバシーポリシーに記載された内容に従って、またはサービスを提供するために必要な期間保持されます。収集した情報は、商品の発送および関連するお問い合わせ対応、新商品やキャンペーン情報のご案内（お客様の同意を得た場合のみ）、サイト運営の改善やサービス向上、さらには法令遵守および利用規約の履行を目的として利用します。お客様の情報が不要になった場合は、適切な手段で安全に削除します。`,
	},
	{
		title: "第三者への情報提供について",
		content: `当サイトでは、法令に基づく場合やお客様の同意がある場合、また配送業者や決済代行業者などの業務委託先に必要な範囲で提供する場合を除き、第三者に個人情報を提供することはありません。ただし、マーケティング、データ分析、サービスのパーソナライズを目的として、個人を特定できない形で統計データを使用する場合があります。`,
	},
	{
		title: "セキュリティ対策",
		content: "当サイトでは、お客様の個人情報を安全に管理するため、適切な技術的・組織的な対策を講じます。不正アクセス、紛失、改ざん、漏えいなどを防止するよう努めます。当サービスのほとんどの領域でHTTPSアクセスを導入するなど、セキュリティ対策を実施しており、定期的にシステムの脆弱性を監視しています。また、安全な決済処理のために決済プラットフォームであるStripeを採用しています。Stripeは、PCI-DSS（Payment Card Industry Data Security Standard）に準拠しており、お客様の決済情報を高いセキュリティ基準のもとで保護します。しかし、これらの努力にもかかわらず、完全なセキュリティを保証することはできません。そのため、強力なパスワードを使用し、漏洩した場合に重大な影響を及ぼすような機密情報を共有しないことをお勧めします。ただし、インターネット上の通信が完全に安全であるとは限らないため、絶対的な保護を保証することはできません。万が一、個人情報の漏えいが発生した場合、影響を受けるお客様に速やかに通知し、適切な対応を講じます。必要に応じて監督当局への報告も行います。"
	},
	{
		title: "クッキー（Cookie）について",
		content: `当サイトでは、クッキー（Cookie）を使用しておりません。そのため、ユーザーのブラウザにクッキーを保存したり、クッキーを通じて個人情報を収集することはありません。サイトの利便性向上やトラッキング目的でのクッキーの利用は行っておりません。当サイトでは現在クッキーを使用しておりませんが、今後、利便性向上のためにクッキーや類似技術を導入する可能性があります。その場合は、本プライバシーポリシーを更新し、適切な通知を行います。`,
	},
	{
		title: "未成年者のプライバシー",
		content: `当サイトは、13歳未満のお客様の個人情報を意図的に収集しません。13歳未満のお客様が当サイトを利用する場合は、保護者の同意が必要です。万が一、保護者の同意なしに情報が提供されたことが判明した場合、適切な措置を講じます。`,
	},
	{
		title: "クッキー（Cookie）について",
		content: `当サイトでは、クッキー（Cookie）を使用しておりません。そのため、ユーザーのブラウザにクッキーを保存したり、クッキーを通じて個人情報を収集することはありません。サイトの利便性向上やトラッキング目的でのクッキーの利用は行っておりません。`,
	},

	{
		title: "一般データ保護規則（GDPR）",
		content: `一般データ保護規則（GDPR）および関連するデータ保護法を遵守しています。欧州経済領域（EEA）内にお住まいの場合、個人データはGDPRの要件に従って処理されます。これには、明示的な同意の取得や、EEA外へのデータ転送に適切な安全対策を実施することが含まれる場合があります。お客様の個人情報がEEA外の国に転送される場合、EU標準契約条項（SCCs）やその他の適切な保護措置を講じ、十分なデータ保護が確保されるよう努めます。お客様は、当サイトが保有するご自身の個人情報に関して、アクセス、訂正、削除、処理制限、異議申し立て、データポータビリティを求める権利があります。これらの権利を行使する場合は、以下のお問い合わせ窓口までご連絡ください。`,
	},
	{
		title: "ポリシーの更新",
		content: `当プライバシーポリシーは、運用、法的、または規制上の理由により、随時更新される場合があります。重要な変更がある場合、ウェブサイトでのポリシー更新や、バナーやメールなどの追加通知を通じてお知らせします。このポリシーを定期的に確認し、お客様の情報がどのように保護されているかを把握することをお勧めします。`,
	},
	{
		title: " 連絡先",
		content: `本プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。`,
	},
	{
		title: "Email",
		content: `kohei8045@gmail.com`,
	},
];