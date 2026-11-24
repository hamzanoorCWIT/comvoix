export type Solution = {
  slug: string; name: string; heading: string; emphasis: string; description: string;
  overviewTitle: string; overview: string; features: readonly (readonly [string, string])[];
  workflowTitle: string; steps: readonly (readonly [string, string])[];
  closing: string; related: readonly [string, string];
};
export const solutions: Solution[] = [
  {
    slug: 'messaging-apis', name: 'Messaging APIs', heading: 'Business Messaging Built Into', emphasis: 'Your Applications',
    description: 'Connect your applications with messaging capabilities for customer communication, notifications and business workflows. Bring timely updates into the experiences your customers already use.',
    overviewTitle: 'Keep Customers Informed at Every Step',
    overview: 'Bring communication closer to the events that matter. Messaging APIs help connect application activity with customer updates, so your team can plan notifications and conversations around an existing business process.',
    features: [['Customer Notifications', 'Keep customers informed about relevant activity, service updates and changes to their requests.'], ['Application Messaging', 'Make messaging part of your application experience and connect communication with the context behind each interaction.'], ['Business Workflows', 'Plan messages around the moments in your workflow when a customer or team member needs an update.']],
    workflowTitle: 'From Application Activity to Customer Communication',
    steps: [['Identify the moment', 'Choose the business events that should prompt a customer message.'], ['Shape the message', 'Prepare useful content, recipient preferences and the response your customer needs.'], ['Connect the workflow', 'Discuss supported channels, integration requirements and delivery handling with our team.']],
    closing: 'Bring Your Next Customer Update Into the Conversation', related: ['Email APIs', '/solutions/email-apis'],
  },
  {
    slug: 'email-apis', name: 'Email APIs', heading: 'Connect Your Applications With', emphasis: 'Business Email',
    description: 'Bring email into your applications to support customer updates, transactional messages and connected business workflows. Keep important information connected to the activity that prompts it.',
    overviewTitle: 'Make Email Part of Your Customer Experience',
    overview: 'A confirmation, an account update or a service message should fit naturally into the customer journey. Email APIs help your application bring those communications into a consistent workflow, with content designed around a clear customer need.',
    features: [['Transactional Messages', 'Plan confirmations and service messages around relevant actions in your application.'], ['Customer Updates', 'Keep customers informed about changes, requests and the next steps in their experience.'], ['Connected Workflows', 'Bring email communication into the business processes your teams already manage.']],
    workflowTitle: 'Turn Business Events Into Useful Email',
    steps: [['Define your messages', 'Identify the confirmations, updates and service communications your application needs.'], ['Prepare the experience', 'Plan sender identity, message content and the customer action each email should support.'], ['Plan the integration', 'Review your application, expected volumes and message-handling requirements with our team.']],
    closing: 'Give Every Important Update a Clear Destination', related: ['Messaging APIs', '/solutions/messaging-apis'],
  },
  {
    slug: 'voice-apis', name: 'Voice APIs', heading: 'Bring Business Conversations', emphasis: 'Into Your Application',
    description: 'Add voice capabilities to your applications and connect customers and teams through flexible calling experiences. Build communication around the way your business works.',
    overviewTitle: 'Connect Application Context With a Conversation',
    overview: 'Voice can be a natural next step when a customer needs help or a team needs to follow up. Voice APIs help bring calling into application workflows, so you can plan how a conversation begins and which people or systems it should connect.',
    features: [['Application Calling', 'Bring voice interactions into the applications and processes that support your business.'], ['Customer Conversations', 'Create a clear route from a customer interaction to the team that can help.'], ['Flexible Call Flows', 'Plan calling experiences around your teams, destinations and operational requirements.']],
    workflowTitle: 'Design the Conversation Around Your Workflow',
    steps: [['Map the call journey', 'Define where a conversation starts and which customer or team it should reach.'], ['Choose the destinations', 'Identify the people, phone systems and business locations involved in your calling experience.'], ['Review your requirements', 'Discuss supported call flows, integration needs and expected calling capacity with our team.']],
    closing: 'Make the Next Conversation Part of Your Product', related: ['Voice Services', '/products/voice-services'],
  },
  {
    slug: 'verification-apis', name: 'Verification APIs', heading: 'Connect Account Verification With', emphasis: 'Your Customer Journey',
    description: 'Support account verification and customer authentication with communication capabilities that fit your application workflows. Plan a clear verification experience around the moments that matter.',
    overviewTitle: 'Make Verification a Considered Part of Your Application',
    overview: 'Account access and customer authentication need a clear communication flow. Verification APIs help connect those interactions with your application, while your team defines the checks, policies and recovery steps appropriate to your service.',
    features: [['Account Verification', 'Support communication steps that help customers complete your account verification process.'], ['Customer Authentication', 'Connect verification messages with the authentication journey designed for your application.'], ['Application Workflows', 'Plan verification around onboarding, account access and other relevant customer interactions.']],
    workflowTitle: 'Build a Clear Path Through Verification',
    steps: [['Choose the checkpoint', 'Identify which account actions need verification in your application.'], ['Plan customer guidance', 'Define the message, next step and recovery path when a customer cannot complete a check.'], ['Review the integration', 'Discuss supported communication methods and how they fit your authentication requirements.']],
    closing: 'Bring Clarity to Your Next Verification Journey', related: ['Messaging APIs', '/solutions/messaging-apis'],
  },
  {
    slug: 'numbers-apis', name: 'Numbers APIs', heading: 'Business Number Capabilities for', emphasis: 'Connected Applications',
    description: 'Bring phone number capabilities into your applications and organize the numbers that support your business communications. Connect numbering requirements with your existing workflows.',
    overviewTitle: 'Keep Business Numbers Connected to Your Operations',
    overview: 'As teams and locations evolve, phone numbers remain an important point of contact. Numbers APIs help connect number-related capabilities with your application so you can plan how business numbers fit your systems, teams and communication processes.',
    features: [['Business Numbers', 'Plan the numbers your business needs for customer contact and day-to-day communication.'], ['Application Connectivity', 'Connect number-related workflows with the applications that support your operations.'], ['Communication Management', 'Organize your numbering requirements around teams, locations and business use cases.']],
    workflowTitle: 'Build Numbering Around Your Business',
    steps: [['Map your requirements', 'Identify the markets, locations and teams that need business numbers.'], ['Connect your systems', 'Define how number-related information should fit your application and communication environment.'], ['Confirm availability', 'Review supported number types, regional availability and technical compatibility with our team.']],
    closing: 'Connect Your Business Numbers With What Comes Next', related: ['Business Numbers', '/products/business-numbers'],
  },
];
