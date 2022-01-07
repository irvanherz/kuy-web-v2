import { createContext } from "react";

export const SnackbarContext = createContext({
  items: [],
  append: item => {
    this.items = this.items.push({ id: Date.now(), ...item})
  },
  destroy: id => {
    this.items = this.items.filter(item => item.id !== id)
  },
});