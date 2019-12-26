import Shop from './Shop'
import MenuItem from './MenuItem'

export default class Order {
  private _shop: Shop;
  private _menuItems: MenuItem[];

  private constructor (
    shop: Shop,
    menuItems: MenuItem[]
  ) {
    this._shop = shop
    this._menuItems = menuItems
  }

  public static emptyOrder: Order = new Order(
    Shop.emptyShop,
    []
  )

  public static fromShop (shop: Shop) {
    return new Order(shop, [])
  }

  public static from (shop: Shop, menuItems: MenuItem[]) {
    return new Order(shop, menuItems)
  }

  get shop () {
    return this._shop
  }

  get menuItems () {
    console.log(typeof (this._menuItems))
    return this._menuItems
  }

  set shop (shop: Shop) {
    this._shop = shop
  }

  set menuItems (menuItems: MenuItem[]) {
    this._menuItems = menuItems
  }

  get numMenuItems () {
    return this._menuItems.length
  }

  get totalPrice () {
    if (this.numMenuItems === 0) {
      return 0
    }
    const prices: number[] = this._menuItems.map((menuItem: MenuItem, index: number, array: MenuItem[]) => +menuItem.price)
    return prices.reduce((totalPrice: number, price: number) => totalPrice + price)
  }

  public static of (obj: any) {
    const menuItems: any[] = obj.menuItems
    const cart: Order = new Order(
      Shop.of(obj.shop),
      menuItems.map(function (item: any, idx: number, array: any[]) {
        return MenuItem.of(item)
      })
    )

    return cart
  }

  public static ofJson (json: string) {
    let obj: string = JSON.parse(json)
    return this.of(obj)
  }

  public toJson () {
    return JSON.stringify({
      shop: this._shop,
      menuItems: this._menuItems
    })
  }
}
