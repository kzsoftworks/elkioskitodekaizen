import { observable } from "mobx";
import { getFirestore, initializeFirebase } from "../firebaseHelpers";
import { subMonths, lastDayOfMonth } from "date-fns/esm";
import AuthState from "./authState";
class FirebaseState {
  @observable db = null;
  @observable purchasedItems = null;

  constructor() {
    initializeFirebase();
    this.db = getFirestore();
  }

  async getAllItems() {
    const items = await this.db.collection("items").get();
    const mappedItems = items.docs.map(x => {
      return { id: x.id, ...x.data() };
    });

    return mappedItems;
  }

  async getMonthPurchases() {
    let purchases = {};
    const today = new Date();
    const lastMonth = subMonths(today, 1);
    const lastDayOfLastMonth = lastDayOfMonth(lastMonth);
    const res = await this.db
      .collection("purchases")
      .where("user_id", "==", AuthState.user.firebaseId)
      .where("date", ">", lastDayOfLastMonth)
      .get();

    const mappedPurchases = res.docs.map(x => {
      return {
        id: x.id,
        ...x.data(),
      };
    });
    const items = await this.getAllItems();
    purchases = mappedPurchases.map(purchase => {
      return {
        ...purchase,
        item: items.filter(x => x.id === purchase.item_id)[0],
        date: new Date(purchase.date.toMillis()),
      };
    });
    // console.log(purchases);
    return purchases;
  }
}

export default new FirebaseState();
