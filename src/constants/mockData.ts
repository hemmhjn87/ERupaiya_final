export const QUICK_ACTIONS = [
  { icon: 'wallet', label: "To Wallet" },
  { icon: 'business', label: "To Account" },
  { icon: 'send', label: "To UPI ID" },
  { icon: 'people', label: "To Contact" }
];

export const TRANSFER_OPTIONS = [
  { icon: 'card', label: "Cards", description: "Add & manage cards" },
  { icon: 'business', label: "Bank Transfer", description: "Transfer to bank account" },
  { icon: 'wallet', label: "Wallet", description: "Transfer to wallet" },
  { icon: 'send', label: "UPI Transfer", description: "Pay using UPI ID" }
];

export const RECENT_TRANSACTIONS = [
  { id: '1', name: "John Doe", amount: "₹500", type: "UPI Transfer", date: "Today" },
  { id: '2', name: "Wallet Topup", amount: "₹2,000", type: "Card Payment", date: "Yesterday" },
  { id: '3', name: "Electric Bill", amount: "₹1,200", type: "UPI Payment", date: "Yesterday" },
  { id: '4', name: "Bank Transfer", amount: "₹5,000", type: "NEFT", date: "2 days ago" }
]; 