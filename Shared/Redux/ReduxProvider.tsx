// 'use client';

// import type React from 'react';
// import { useEffect, useRef, useState } from 'react';
// import { Provider } from 'react-redux';
// import { makeStore, type AppStore } from '@/lib/store';
// import { persistStore, type Persistor } from 'redux-persist';

// const PersistGate = ({
//   children,
//   loading = null,
//   persistor,
// }: {
//   children: React.ReactNode;
//   loading?: React.ReactNode;
//   persistor: Persistor;
// }) => {
//   const [bootstrapped, setBootstrapped] = useState(false);

//   useEffect(() => {
//     const unsubscribe = persistor.subscribe(() => {
//       const { bootstrapped } = persistor.getState();
//       if (bootstrapped) {
//         setBootstrapped(true);
//       }
//     });

//     // Check initial state
//     const { bootstrapped } = persistor.getState();
//     if (bootstrapped) {
//       setBootstrapped(true);
//     }

//     return () => {
//       unsubscribe();
//     };
//   }, [persistor]);

//   return bootstrapped ? <>{children}</> : <>{loading}</>;
// };

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore>(null);
//   const persistorRef = useRef<Persistor>(null);

//   if (!storeRef.current) {
//     // Create the store instance the first time this renders
//     storeRef.current = makeStore();
//     persistorRef.current = persistStore(storeRef.current) as any;
//   }

//   return (
//     <Provider store={storeRef.current}>
//       <PersistGate loading={null} persistor={persistorRef.current!}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }
'use client';

import type React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
