export interface CartToastState {
  visible: boolean;
  productTitle: string;
  /** Increments when re-showing so timers / animation reset */
  nonce: number;
  show: (productTitle: string) => void;
  hide: () => void;
}
