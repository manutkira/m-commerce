<template>
  <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 align-items-center">
              <div class="col-md-6 ml-3">
                    <h3>Profile settings</h3>
                    
                 <p>
                   Change your profile settings here
                 </p>
              </div>
              <div class="col-md-5">
                  <img src="../../public/img/svg/undraw_product_teardown_elol.svg" width="300" alt="" class="img-fluid">
              </div>
            </div>
          </div>


          <div class="profile-content">

          <ul class="nav nav-pills ml-3" id="myTab" role="tablist">

            <li class="nav-item">
              <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
            </li>

            <li class="nav-item">
              <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
            </li>
           
          </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                  <div class="container">
                      <div class="row">
                        
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" name="" v-model="firstName" placeholder="First name" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="lastName" placeholder="Last Name" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="text"  v-model="userName" placeholder="Username" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-8">
                          <div class="form-group">
                            <input type="text"  v-model="email" placeholder="Email" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-primary w-100">
                          </div>
                        </div>

                      </div>
                  </div>
                
                </div>

                <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                  <div class="container">
                      <div class="row">
                        <div class="col-md-">
                            <div class="alert alert-info">
                              Please use the Reset password email button for reseting the password. The form doens't work currently
                            </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="userName" placeholder="Username" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="email" placeholder="Email address" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="password" placeholder="New password" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" v-model="confirmPassword"  placeholder="Confirm password" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="file" @change="uploadImage" class="form-control">
                           </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input  type="submit" value="Save Changes" class="btn btn-primary w-100">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input @click="updatePassword" type="button" value="Reset password email"  class="btn btn-success w-100">
                          </div>
                        </div>
                      </div>
                  </div>
                </div>

            </div>
            
          </div>

      </div>

    
  </div>
</template>

<script>
import { firebaseApp ,db } from '../firebase/firebaseInit'
export default {
    name: 'profile',
    props: {
        msg: String
    },
    data(){
        return{
            firstName: '',
            lastName: '',
            userName: '',
            email: '',

        }
    },
    methods: {
        updatePassword(){
            let auth = firebaseApp.auth()
            console.log(auth);
            auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
                Toast.fire({
                icon: 'success',
                title: 'Email has been sent'
                    }) 
            })
        },
        updateProfile(){
            const user = firebaseApp.auth().currentUser
           db.collection('user').doc(user.uid).update({
               firstName: this.firstName,
               lastName: this.lastName,
               userName: this.userName,
               email: this.email,
           })
                    Toast.fire({
                    icon: 'success',
                    title: 'Update successfully'
                        }) 
        },
        readData(){ 
            db.collection('user').doc(firebaseApp.auth().currentUser.uid).get().then(doc => {
                this.firstName = doc.data().firstName
                this.lastName = doc.data().lastName
                this.userName = doc.data().userName
                this.email = doc.data().email
        })
        },
    },
    created(){
        this.readData()
    }

}
</script>

<style lang="scss" scoped>
.profile{
    .container{
        max-width: 1000px;
        padding: 60px 25px;

        h2{
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        .profile-info{
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;

            .initials{
                position: initial;
                width: 80px;
                height: 80px;
                font-size: 32px;
                background-color: #303030;
                color: #fff;
                display: flex;
                align-self: center;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
            }
            .admin-badge{
                display: flex;
                align-self: center;
                color: #fff;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background-color: #303030;
                margin: 16px 0;
                text-align: center;
                text-transform: capitalize;

                .icon{
                    width: 14px;
                    height: auto;
                    margin-right: 8px;
                }
            }
            .input{
                margin: 16px 0;

                label{
                    font-size: 14px;
                    display: block;
                    padding-bottom: 6px;
                }
                input{
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 8px;
                    height: 50px;
                    @media (min-width: 900px) {
                        
                    }

                    &:focus{
                        outline: none;
                    }
                }
            }
            button{
                align-self: center;
            }
        }
    }
}
</style>