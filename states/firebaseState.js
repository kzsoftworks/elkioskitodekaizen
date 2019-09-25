import { observable } from "mobx";
import { getFirestore, initializeFirebase } from "../firebaseHelpers";

class FirebaseState {
  @observable db = null;
  @observable purchasedItems = null;

  constructor() {
    initializeFirebase();
    this.db = getFirestore();
  }

  async getAllItems() {
    const items = await this.db.collection("items").get();
    return items.docs.map(x => x.data());
  }

  async getMonthPurchases() {
    let purchases = {};
    const res = await this.db.collection("purchases").get();

    const mappedPurchases = res.docs.map(x => x.data());
    const items = await this.getAllItems();
    purchases = mappedPurchases.map(purchase => {
      return {
        ...purchase,
        item: items.filter(x => x.bar_code === purchase.bar_code)[0],
      };
    });
    return purchases;
  }
}

export default new FirebaseState();
