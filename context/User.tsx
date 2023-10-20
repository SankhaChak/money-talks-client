import { GroupDTO, IFeeds, PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { GroupCreationOptions } from "@pushprotocol/restapi/src/lib/pushapi/pushAPITypes";
import { createContext, useCallback, useContext } from "react";
import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { goerli } from "viem/chains";
import { useAccount } from "wagmi";

type Props = {
  children: React.ReactNode;
};

type UserContextType = {
  getUserChats: () => Promise<IFeeds[]>;
  getUserRequests: () => Promise<IFeeds[]>;
  handleCreateGroupChat: (
    groupName: string,
    options: GroupCreationOptions
  ) => Promise<GroupDTO>;
  isLoggedIn: boolean;
};

const UserContext = createContext<UserContextType>({
  getUserChats: async () => [],
  getUserRequests: async () => [],
  handleCreateGroupChat: async () => ({} as GroupDTO),
  isLoggedIn: false,
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = (props: Props) => {
  const { children } = props;

  const account = useAccount();
  const isLoggedIn = account.isConnected && !!account.address;

  const env = ENV.STAGING;

  const getUserChats = useCallback(async () => {
    const signer = createWalletClient({
      account: privateKeyToAccount(generatePrivateKey()),
      chain: goerli,
      transport: http(),
    });

    const user = await PushAPI.initialize(signer, { env });
    const userChats = await user.chat.list("CHATS");
    console.log(
      "🚀 ~ file: User.tsx:34 ~ getUserChats ~ userChats:",
      userChats
    );

    return userChats;
  }, [env]);

  const getUserRequests = useCallback(async () => {
    const signer = createWalletClient({
      account: privateKeyToAccount(generatePrivateKey()),
      chain: goerli,
      transport: http(),
    });

    const user = await PushAPI.initialize(signer, { env });
    const userRequests = await user.chat.list("REQUESTS");
    console.log(
      "🚀 ~ file: User.tsx:52 ~ getUserRequests ~ userRequests:",
      userRequests
    );

    return userRequests;
  }, [env]);

  const handleCreateGroupChat = useCallback(
    async (groupName: string, options: GroupCreationOptions) => {
      const signer = createWalletClient({
        account: privateKeyToAccount(generatePrivateKey()),
        chain: goerli,
        transport: http(),
      });

      const user = await PushAPI.initialize(signer, { env });

      const createdGroup = await user.chat.group.create(groupName, options);
      console.log(
        "🚀 ~ file: ChatsEmptyState.tsx:265 ~ handleNewGroupChatCreation ~ createdGroup:",
        createdGroup
      );

      return createdGroup;
    },
    [env]
  );

  const value: UserContextType = {
    getUserChats,
    getUserRequests,
    handleCreateGroupChat,
    isLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
