export type RootTabParamList = {
  Home: undefined;
  Transfers: undefined;
  Rewards: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  Register: undefined;
  Transfer: {
    recipientId?: string;
    amount?: string;
  };
  TransactionDetail: {
    transactionId: string;
  };
  NotFound: undefined;
};

export type QuickAction = {
  icon: string;
  label: string;
};

export type TransferOption = {
  icon: string;
  label: string;
  description: string;
};

export type Transaction = {
  id: string;
  name: string;
  amount: string;
  type: string;
  date: string;
};
