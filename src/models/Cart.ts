import Shop from './Shop'
import MenuItem from './MenuItem'

export default class Cart {
  private _shop: Shop;
  private _menuItems: MenuItem[];

  private constructor (
    shop: Shop,
    menuItems: MenuItem[]
  ) {
    this._shop = shop
    this._menuItems = menuItems
  }

  public static emptyCart: Cart = new Cart(
    Shop.emptyShop,
    []
  )

  get shop () {
    return this._shop
  }

  set shop (shop: Shop) {
    this._shop = shop
  }

  get menuItems () {
    console.log(typeof (this._menuItems))
    return this._menuItems
  }

  get numCartMenuItems () {
    return this._menuItems.length
  }

  get totalMenuPrice () {
    if (this.numCartMenuItems === 0) {
      return 0
    }
    const prices: number[] = this._menuItems.map((menuItem: MenuItem, index: number, array: MenuItem[]) => +menuItem.price)
    return prices.reduce((totalPrice: number, price: number) => totalPrice + price)
  }

  public static of (obj: any) {
    const menuItems: any[] = obj.menuItems
    const cart: Cart = new Cart(
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

  public pushMenuItem (menuItem: MenuItem) {
    this._menuItems.push(menuItem)
  }

  public clearMenuItems () {
    this._menuItems = []
  }
}
