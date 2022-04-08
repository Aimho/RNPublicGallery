import {useEffect} from 'react';
import events from '../lib/events';

function usePostsEventEffect({refresh, removePost, enabled}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    events.addListener('refresh', refresh);
    events.addListener('removePost', removePost);
    return () => {
      events.removeListener('refresh', refresh);
      events.removeListener('removePost', removePost);
    };
  }, [refresh, removePost, enabled]);
}

export default usePostsEventEffect;
