import { PlusIcon } from "@heroicons/react/20/solid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useUserContext } from "../../context/User";
import NewGroupChatModal from "./NewGroupChatModal";

const ChatsEmptyState = () => {
  const { handleCreateGroupChat } = useUserContext();

  // const handleNewGroupChatCreation = async () => {
  //   const signer = createWalletClient({
  //     account: privateKeyToAccount(generatePrivateKey()),
  //     chain: goerli,
  //     transport: http(),
  //   });

  //   const signerAddress = signer.account.address;

  //   const groupName = "Test Group";
  //   const groupDescription = "Test Group Description";
  //   const groupImage =
  //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4AcXBsW2FMBiF0Y8r3GQb6jeBxRauYRpo4yGQkMd4A7kg7Z/GUfSKe8703fKDkTATZsJsrr0RlZSJ9r4RLayMvLmJjnQS1d6IhJkwE2bT13U/DBzp5BN73xgRZsJMmM1HOolqb/yWiWpvjJSUiRZWopIykTATZsJs5g+1N6KSMiO1N/5DmAkzYTa9Lh6MhJkwE2ZzSZlo7xvRwson3txERzqJhJkwE2bT6+JhoKTMJ2pvjAgzYSbMfgDlXixqjH6gRgAAAABJRU5ErkJggg==";

  //   const env = ENV.STAGING;

  //   const user = await PushAPI.initialize(signer, { env });

  //   const createdGroup = await user.chat.group.create(groupName, {
  //     description: groupDescription,
  //     image: groupImage,
  //     members: [],
  //     admins: [],
  //     private: false,
  //   });
  //   console.log(
  //     "🚀 ~ file: ChatsEmptyState.tsx:265 ~ handleNewGroupChatCreation ~ createdGroup:",
  //     createdGroup
  //   );
  // };

  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-100">No Chats</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new group chat.
      </p>
      <div className="mt-6">
        {/* <button
          onClick={handleNewGroupChatCreation}
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          New Group Chat
        </button> */}
        <Dialog>
          <DialogTrigger>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Group Chat
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter your group chat details:</DialogTitle>
              <DialogDescription className="py-4">
                <NewGroupChatModal />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChatsEmptyState;
