/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useRef } from "react";
import { UseToastOptions, useToast } from "@chakra-ui/react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../../app/features/networkSlice";

interface IProps {
  children: ReactNode;
}

const InternetConnectionProvider = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const toastIdRef = useRef<UseToastOptions | undefined | string>();

  function close() {
    toast.closeAll(undefined); // Pass undefined to close all toasts
  }

  function addToast() {
    toastIdRef.current = toast({
      title: "You're offline.",
      description: "Please make sure you have internet connectivity.",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    }) as string;
  }

  const setOnline = () => {
    dispatch(networkMode(true));
    close();
  };

  const setOffline = () => {
    dispatch(networkMode(false));
    addToast();
  };

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      // ** Cleanup
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return children;
};

export default InternetConnectionProvider;
