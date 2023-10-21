import { GroupDTO, IFeeds, PushAPI, chat } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { GroupCreationOptions } from "@pushprotocol/restapi/src/lib/pushapi/pushAPITypes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { goerli } from "viem/chains";
import { useAccount as useWagmiAccount } from "wagmi";

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
  userChats: IFeeds[];
  userRequests: IFeeds[];
};

const UserContext = createContext<UserContextType>({
  getUserChats: async () => [],
  getUserRequests: async () => [],
  handleCreateGroupChat: async () => ({} as GroupDTO),
  isLoggedIn: false,
  userChats: [],
  userRequests: [],
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = (props: Props) => {
  const { children } = props;
  const userAccount = useWagmiAccount();
  const isLoggedIn = userAccount.isConnected && !!userAccount.address;

  const [userChats, setUserChats] = useState<IFeeds[]>([]);
  const [userRequests, setUserRequests] = useState<IFeeds[]>([]);

  const env = ENV.STAGING;

  const getUserChats = useCallback(async () => {
    // let threadhash: any = "";
    // if (!threadhash) {
    //   threadhash = await chat.conversationHash({
    //     account: account,
    //     conversationId: chatId,
    //     env: appConfig.appEnv,
    //   });
    //   threadhash = threadhash.threadHash;
    // }

    // if (threadhash) {
    //   const chats = await chat.history({
    //     account,
    //     pgpPrivateKey: pgpPrivateKey,
    //     threadhash: threadhash,
    //     toDecrypt: false,
    //     limit: limit,
    //     env: appConfig.appEnv,
    //   });

    //   const lastThreadHash = chats[chats.length - 1]?.link;
    //   const lastListPresent = chats.length > 0 ? true : false;
    //   return { chatsResponse: chats, lastThreadHash, lastListPresent };
    // }

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

  const refetchUserChatsAndRequests = useCallback(async () => {
    await getUserChats().then((chats) => setUserChats(chats));
    await getUserRequests().then((requests) => setUserRequests(requests));
  }, [getUserChats, getUserRequests]);

  const getRandomWalletAddress = useCallback(async () => {
    const randomWalletAddress = privateKeyToAccount(
      generatePrivateKey()
    ).address;
    return randomWalletAddress;
  }, []);

  const handleCreateGroupChat = useCallback(
    async (groupName: string, options: GroupCreationOptions) => {
      const signer = createWalletClient({
        account: privateKeyToAccount(generatePrivateKey()),
        chain: goerli,
        transport: http(),
      });

      const user = await PushAPI.initialize(signer, { env });

      const groupMembers = await Promise.all([
        getRandomWalletAddress(),
        getRandomWalletAddress(),
        getRandomWalletAddress(),
      ]);

      const createdGroup = await user.chat.group.create(groupName, {
        ...options,
        members: groupMembers,
      });
      // const createdGroup = await chat.createGroup({
      //   groupName,
      //   members: groupMembers,
      //   groupDescription: options.description,
      //   isPublic: false,
      //   admins: [],
      //   signer,
      //   groupImage:
      //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4AcXBsW2FMBiF0Y8r3GQb6jeBxRauYRpo4yGQkMd4A7kg7Z/GUfSKe8703fKDkTATZsJsrr0RlZSJ9r4RLayMvLmJjnQS1d6IhJkwE2bT13U/DBzp5BN73xgRZsJMmM1HOolqb/yWiWpvjJSUiRZWopIykTATZsJs5g+1N6KSMiO1N/5DmAkzYTa9Lh6MhJkwE2ZzSZlo7xvRwson3txERzqJhJkwE2bT6+JhoKTMJ2pvjAgzYSbMfgDlXixqjH6gRgAAAABJRU5ErkJggg==",
      //   env,
      // });
      console.log(
        "🚀 ~ file: ChatsEmptyState.tsx:265 ~ handleNewGroupChatCreation ~ createdGroup:",
        createdGroup
      );

      await user.chat.group.join(createdGroup.chatId);

      await user.chat.send(createdGroup.chatId, {
        content: "Welcome to the group!",
        type: "Text",
      });

      await refetchUserChatsAndRequests();

      return createdGroup;
    },
    [env, getRandomWalletAddress, refetchUserChatsAndRequests]
  );

  useEffect(() => {
    if (isLoggedIn) {
      getUserChats().then((chats) => setUserChats(chats));
      getUserRequests().then((requests) => setUserRequests(requests));
    }
  }, [isLoggedIn, getUserChats, getUserRequests]);

  const value: UserContextType = {
    getUserChats,
    getUserRequests,
    handleCreateGroupChat,
    isLoggedIn,
    userChats,
    userRequests,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
