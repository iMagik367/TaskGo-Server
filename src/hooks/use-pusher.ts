import { useEffect } from "react";
import { pusherClient } from "@/lib/realtime";

export function usePusher(channelName: string, eventName: string, callback: (data: any) => void) {
  useEffect(() => {
    const channel = pusherClient.subscribe(channelName);
    channel.bind(eventName, callback);

    return () => {
      channel.unbind(eventName, callback);
      pusherClient.unsubscribe(channelName);
    };
  }, [channelName, eventName, callback]);
}