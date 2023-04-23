import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async, Observable } from 'rxjs'
import { recommender } from 'googleapis/build/src/apis/recommender';
import { DomSanitizer } from '@angular/platform-browser';
import { CardsI } from 'app/models/cards.interface';
import { RazasI } from 'app/models/razas.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = "https://localhost:7085/"
  private sanitizer: DomSanitizer

  constructor(private http:HttpClient) { }

  getBase64 = async($event: any) => new Promise((resolve,reject) => {
    try {
      const reader = new FileReader()
      reader.readAsDataURL($event)
      reader.onload = () => {
        resolve({
          base:reader.result
          
        })
      }
      reader.onerror = error => {
        resolve ({
          base:null
        })
      }
    } catch(e){
      return null
    }
  })

  getCards():Observable<CardsI[]>{
    let dir = this.url + "carta/lista"
    return this.http.get<CardsI[]>(dir)
  }
  addCard(card:CardsI):Observable<string>{
    let dir = this.url + "carta/guardar"
    return this.http.post<string>(dir, card)
  }
  updateCard(card:CardsI):Observable<string>{
    let dir = this.url + "carta/editar"
    return this.http.put<string>(dir, card)
  }

  getRazas():Observable<RazasI[]>{
    let dir = this.url + "carta/razas"
    return this.http.get<RazasI[]>(dir)
  }
  /*login(username:string, password:string):Observable<LoginI>{
    let dir = this.url + "login/get/" + username + "/" + password
    return this.http.get<LoginI>(dir)
  }

  sendFeed(feed:FeedI):Observable<string>{
    let dir = "https://mongoapi0907.azurewebsites.net/api/Feedback/"
    return this.http.post<string>(dir, feed)
  }

  getEmployees():Observable<EmployeeI[]>{
    let dir = this.url + "empleado/get"
    return this.http.get<EmployeeI[]>(dir)
  }
  getEmployee(id:string):Observable<EmployeeI>{
    let dir = this.url + "empleado/get/" + id
    return this.http.get<EmployeeI>(dir)
  }
  addEmployee(employee:EmployeeI):Observable<string>{
    let dir = this.url + "empleado/guardar"
    return this.http.post<string>(dir, employee)
  }
  updateEmployee(employee:EmployeeI):Observable<string>{
    let dir = this.url + "empleado/update"
    return this.http.put<string>(dir, employee)
  }
  deleteEmployee(id:any):Observable<string>{
    let dir = this.url + "empleado/delete/" + id
    return this.http.delete<string>(dir)
  }

  getAffiliates():Observable<AffiliateI[]>{
    let dir = this.url + "affiliado/get"
    return this.http.get<AffiliateI[]>(dir)
  }
  getAffiliateID(id:string):Observable<AffiliateI>{
    let dir = this.url + "affiliado/get/" + id
    return this.http.get<AffiliateI>(dir)
  }
  getAffiliateStatus(status:string):Observable<AffiliateI[]>{
    let dir = this.url + "affiliado/get_status/" + status
    return this.http.get<AffiliateI[]>(dir)
  }
  addAffiliate(affiliate:AffiliateI):Observable<string>{
    let dir = this.url + "affiliado/guardar"
    return this.http.post<string>(dir, affiliate)
  }
  addRequest(request:RequestI):Observable<string>{
    let dir = this.url + "affiliado/crear_solicitud"
    return this.http.post<string>(dir, request)
  }
  updateAffiliate(affiliate:AffiliateI):Observable<string>{
    let dir = this.url + "affiliado/update"
    return this.http.put<string>(dir, affiliate)
  }
  updateRequest(request:RequestI):Observable<string>{
    let dir = this.url + "affiliado/update_solicitud"
    return this.http.put<string>(dir, request)
  }
  deleteAffiliate(id:string):Observable<string>{
    let dir = this.url + "affiliado/delete/" + id
    return this.http.delete<string>(dir)
  }

  getAdmins():Observable<AdminI[]>{
    let dir = this.url + "adminAf/get"
    return this.http.get<AdminI[]>(dir)
  }
  getAdminID(id:string):Observable<AdminI>{
    let dir = this.url + "adminAf/get/" + id
    return this.http.get<AdminI>(dir)
  }
  addAdmin(admin:AdminI):Observable<string>{
    let dir = this.url + "adminAf/guardar"
    return this.http.post<string>(dir, admin)
  }
  updateAdmin(admin:AdminI):Observable<string>{
    let dir = this.url + "adminAf/update"
    return this.http.put<string>(dir, admin)
  }
  deleteAdmin(id:string):Observable<string>{
    let dir = this.url + "adminAf/delete/" + id
    return this.http.delete<string>(dir)
  }

  getCommerces():Observable<CommerceI[]>{
    let dir = this.url + "tipo_comercio/get"
    return this.http.get<CommerceI[]>(dir)
  }
  getCommerceID(id:string):Observable<CommerceI>{
    let dir = this.url + "tipo_comercio/get/" + id
    return this.http.get<CommerceI>(dir)
  }
  addCommerce(commerce:CommerceI):Observable<string>{
    let dir = this.url + "tipo_comercio/guardar"
    return this.http.post<string>(dir, commerce)
  }
  updateCommerce(commerce:CommerceI):Observable<string>{
    let dir = this.url + "tipo_comercio/update"
    return this.http.put<string>(dir, commerce)
  }
  deleteCommerce(id:string):Observable<string>{
    let dir = this.url + "tipo_comercio/delete/" + id
    return this.http.delete<string>(dir)
  }
  
  getDealers():Observable<AdminI[]>{
    let dir = this.url + "repartidor/get"
    return this.http.get<AdminI[]>(dir)
  }
  getDealerID(id:string):Observable<AdminI>{
    let dir = this.url + "repartidor/get/" + id
    return this.http.get<AdminI>(dir)
  }
  addDealer(dealer:AdminI):Observable<string>{
    let dir = this.url + "repartidor/guardar"
    return this.http.post<string>(dir, dealer)
  }
  updateDealer(dealer:AdminI):Observable<string>{
    let dir = this.url + "repartidor/update"
    return this.http.put<string>(dir, dealer)
  }
  deleteDealer(id:string):Observable<string>{
    let dir = this.url + "repartidor/delete/" + id
    return this.http.delete<string>(dir)
  }

  getProductos():Observable<ProductI[]>{
    let dir = this.url + "producto/get"
    return this.http.get<ProductI[]>(dir)
  }
  getProductoID(id:string):Observable<ProductI>{
    let dir = this.url + "producto/get/" + id
    return this.http.get<ProductI>(dir)
  }
  getProductoAffiliado(id:string):Observable<ProductI[]>{
    let dir = this.url + "producto/get_afiliado/" + id
    return this.http.get<ProductI[]>(dir)
  }
  addProducto(product:ProductI):Observable<string>{
    let dir = this.url + "producto/guardar"
    return this.http.post<string>(dir, product)
  }
  updateProducto(product:ProductI):Observable<string>{
    let dir = this.url + "producto/update"
    return this.http.put<string>(dir, product)
  }
  deleteProducto(id:string):Observable<string>{
    let dir = this.url + "producto/delete/" + id
    return this.http.delete<string>(dir)
  }

  getOrders():Observable<OrderI[]>{
    let dir = this.url + "cart-pedido/get"
    return this.http.get<OrderI[]>(dir)
  }
  getDealer(id:string):Observable<string>{
    let dir = this.url + "cart-pedido/getRep/" + id
    return this.http.get<string>(dir)
  }
  getOrderID(id:string):Observable<OrderI>{
    let dir = this.url + "cart-pedido/get/" + id
    return this.http.get<OrderI>(dir)
  }
  getOrderIDUser(id:string):Observable<OrderI[]>{
    let dir = this.url + "cart-pedido/get-user/" + id
    return this.http.get<OrderI[]>(dir)
  }
  getOrderIDAf(id:string):Observable<OrderI[]>{
    let dir = this.url + "cart-pedido/get-af/" + id
    return this.http.get<OrderI[]>(dir)
  }
  addOrder(dealer:OrderI):Observable<string>{
    let dir = this.url + "cart-pedido/guardar"
    return this.http.post<string>(dir, dealer)
  }
  updateProductCart(cart:NewOrderI):Observable<string>{
    let dir = this.url + "cart-pedido/updateP"
    return this.http.put<string>(dir, cart)
  }
  addProductCart(cart:NewOrderI):Observable<string>{
    let dir = this.url + "cart-pedido/add_product"
    return this.http.put<string>(dir, cart)
  }
  createCart(cart:NewOrderI):Observable<string>{
    let dir = this.url + "cart-pedido/crear_carrito"
    return this.http.put<string>(dir, cart)
  }
  createOrder(id:string):Observable<string>{
    let dir = this.url + "cart-pedido/crear_pedido/" + id 
    return this.http.get<string>(dir)
  }
  readyOrder(id:string):Observable<string>{
    let dir = this.url + "cart-pedido/alistar_pedido/" + id
    return this.http.get<string>(dir)
  }
  receiveOrder(id:string):Observable<string>{
    let dir = this.url + "cart-pedido/recibir_pedido/" + id
    return this.http.get<string>(dir)
  }
  deleteOrder(id:string):Observable<string>{
    let dir = this.url + "cart-pedido/delete/" + id
    return this.http.delete<string>(dir)
  }

  getClients():Observable<ClientI[]>{
    let dir = this.url + "cliente/get"
    return this.http.get<ClientI[]>(dir)
  }
  getClientID(id:string):Observable<ClientI>{
    let dir = this.url + "cliente/get/" + id
    return this.http.get<ClientI>(dir)
  }
  addClient(dealer:ClientI):Observable<string>{
    let dir = this.url + "cliente/guardar"
    return this.http.post<string>(dir, dealer)
  }
  updateClient(dealer:ClientI):Observable<string>{
    let dir = this.url + "cliente/update"
    return this.http.put<string>(dir, dealer)
  }
  deleteClient(id:string):Observable<string>{
    let dir = this.url + "cliente/delete/" + id
    return this.http.delete<string>(dir)
  }

  getReport1():Observable<Report1I[]>{
    let dir = this.url + "reporte/get/1"
    return this.http.get<Report1I[]>(dir)
  }
  getReport2():Observable<Report2I[]>{
    let dir = this.url + "reporte/get/2"
    return this.http.get<Report2I[]>(dir)
  }*/
}