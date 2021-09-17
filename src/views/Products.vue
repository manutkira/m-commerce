<template>
  <div class="products">
      <div class="container h-100">
          <div class="intro h-100">
              <div class="row h-100 justify-content-center align-items-center">
                  <div class="col-md-6">
                      <h3>Products Page</h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad doloribus inventore dolorum, explicabo earum commodi!      
                    </p>    
                  </div>
                  <div class="col-md-6">
                      <img src="../../public/img/svg/undraw_product_tour_re_8bai.svg" alt="" class="img-fluid">
                  </div>
              </div>
          </div>
          <div class="product-test">

              <hr>
                  <h3 class="d-inline-block">Products list</h3>
                
                <button class="float-right mb-2" @click="addNew">Add Product</button>
                
                <div class="table-responsive">
                  <table class="table">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Brand</th>
                              <th>Color</th>
                              <th>Price</th>
                              <th>Modify</th>
                          </tr>
                      </thead>
                      <tbody >
                          <tr  v-for="product in products" :key="product">
                              <td>{{product.data().name}}</td>
                              <td>{{product.data().brand}}</td>
                              <td>{{product.data().color}}</td>
                              <td>${{product.data().price}}</td>
                              <td>
                                  <button @click="editProduct(product)" >Edit</button>
                                  <button @click="deleteProduct(product.id)" class=" ml-2">Delete</button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                </div>
          </div>
      </div>

    <!-- Modal -->
<div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editLabel">Edit product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                    <input type="text" placeholder="Product name" v-model="name" class="form-control">
                </div>

                <div class="form-group">
                    <vue-editor v-model="description"></vue-editor>
                </div>
              </div>

              <!-- product sidebar -->

              <div class="col-md-4">
                  <h4 class="display-6">Product Details</h4>
                  <hr>

                    <div class="form-group">
                        <input type="text" placeholder="Product price" v-model="price" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Product Brand" v-model="brand" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Product Color" v-model="color" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" placeholder="Product tags" v-model="tag" @keyup.,="addTag" class="form-control">
                      
                      <div  class="d-flex overflow-auto">
                        <p class="border" v-for="tag in tags" :key="tag">
                            <span class="p-1">{{tag}}</span>
                        </p>

                      </div>
                    </div>

                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex overflow-auto">
                      <div class="p-1" v-for="(image, index) in images" :key="index">
                          <div class="img-wrapp">
                              <img class="ml-4 mt-4" :src="image" alt="">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>

              </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button @click="AddProduct()" type="button" class="btn btn-primary" v-if="editModal == 'addNew'">Save changes</button>
        <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="editModal == 'edit'">Update changes</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>

import {firebaseApp, db} from '../firebase/firebaseInit'
export default {
    name: 'Products',
    props: {
        msg: String
    },
    data(){
        return{
            products: [],
            name: null,
            description: null,
            tags: [],
            price: null,
            images: [],
            brand: null,
            color: null,
            activeProduct: null,
            editModal: null,
            tag: null,
        }
    },
    methods: {
        deleteImage(img, index){
            let image = firebaseApp.storage().refFromURL(img)

            this.images.splice(index, 1)
            image.delete().then(() => {
            })
        },
        addTag(){
            this.tags.push(this.tag)
            this.tag = ''
        },
        uploadImage(e){
            if(e.target.files[0]){

                let file = e.target.files[0]
                
                let storageRef = firebaseApp.storage().ref('products/' + file.name)
    
              let uploadTask = storageRef.put(file)
    
              uploadTask.on('state_changed', snapshot => {
    
              }, err => {
    
              }, () => {
                  uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                      this.images.push(downloadURL)
                  })
              })
            }
        },
        reset(){
            this.name = null
            this.description = null
            this.tags = []
            this.price = null
            this.images = []
            this.brand = null
            this.color = null
        },
        addNew(){
            $("#product").modal('show')
            this.editModal = 'addNew'
            this.reset()
        }, 
        watcher(){
            db.collection('products').onSnapshot((querySnapshot) => {
                this.products = []
                querySnapshot.forEach(doc => {
                    this.products.push(doc)
                })
            })
        },
        updateProduct(){
            db.collection('products').doc(this.activeProduct).update({
                name: this.name,
                price: this.price,
                brand: this.brand,
                color: this.color,
                tag: this.tag,
                images: this.images,
                description: this.description,
                }).then(() => {
                    $("#product").modal('hide')
                    this.watcher()
                    Toast.fire({
                    icon: 'success',
                    title: 'Update successfully'
                        }) 
                })
        },
        editProduct(product){
            this.editModal = 'edit'
            $("#product").modal('show')
            this.name = product.data().name
            this.price = product.data().price
            this.brand = product.data().brand
            this.color = product.data().color
            this.tags = product.data().tag
            this.images = product.data().images
            this.description = product.data().description
            this.activeProduct = product.id
        },
        readData(){ 
            db.collection('products').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.products.push(doc)
            })
        })
        },
        AddProduct(){
            
            db.collection('products').add({
                name: this.name,
                price: this.price,
                brand: this.brand,
                color: this.color,
                tag: this.tags,
                description: this.description,
                images: this.images,
            }).then(() => {
                 this.readData()
                 $("#product").modal('hide')
                     location.reload();
            })
        },
        deleteProduct(doc){
                    Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const dataBase = db.collection('products').doc(doc)
                            dataBase.delete()
                        Toast.fire({
                        icon: 'success',
                        title: 'Deleting the file'
                        })
                      }
                      setTimeout(() => {
                          location.reload()
                      }, 1200)
                    })
        }
    },
    created(){
        this.readData()
    }
}
</script>

<style lang="scss" scoped>

.table th, .table td{
    vertical-align: unset;
}
.border{
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 0;
  padding: 1px 5px;
  background-color: #303030;
  color: #fff;
  font-size: 10px;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}
button{
  transition: 500ms ease all;
  cursor: pointer;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus{
    outline: none;
  }
  &:hover{
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.img-wrapp{
    position: relative;
    
}
img{
    width: 80px;
}

.img-wrapp span.delete-img{
    position: absolute;
    top: 14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
    cursor: pointer;
}
</style>