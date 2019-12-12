
export default class Shop {
  // getter 를 만들어줘야 할 것 같다
  // _id 처럼 이름을 짓고서 get 을 통해 접근?
  public id: string;
  private name: string;
  private image: string;
  private address: string;
  private phoneNumber: string;

  private constructor (
    id: string,
    name: string,
    image: string,
    address: string,
    phoneNumber: string
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.address = address
    this.phoneNumber = phoneNumber
  }

  public static emptyShop: Shop = new Shop(
    '0',
    'empty_shop',
    'empty_image',
    'empty_address',
    'empty_phoneNumber'
  )

  public static of (obj: any) {
    return new Shop(
      obj.id,
      obj.name,
      obj.image,
      obj.address,
      obj.phoneNumber
    )
  }

  public static ofJson (json: string) {
    let obj: string = JSON.parse(json)
    return this.of(obj)
  }

  public toJson () {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      image: this.image,
      address: this.address,
      phoneNumber: this.phoneNumber
    })
  }
}
