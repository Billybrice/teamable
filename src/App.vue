    <template>

<div v-show="!isEditMode">
    <h1>user profil</h1>
    <img :src="image" alt="user-image">
    <span>Name:</span><b id="name">{{ name }}</b>
    <hr/>
    <span>Email:</span><b id="email">{{ email }}</b>
    <hr/>
    <span>Interests:</span><b id="interests">{{ interests }}</b>
    <hr/>

    <button @click="handleEditProfile">Edit profile</button>
</div>

<div v-show="isEditMode">
    <h1>user profil</h1>
    <img :src="image" alt="user-image">
    <span>Name:</span>
    <input type="text" id="input-name" v-model="name">
    <hr/>
    <span>Email:</span><input id="input-email" type="email" v-model="email">
    <hr/>
    <span>Interests:</span><input id="input-interests" type="text" v-model="interests">
    <hr/>

    <button @click="handleUpdateProfile">update now</button>
</div>
</template>


<script>
import image from "./images/user-profile.jpeg"
export default{
    name: "App",
    data(){
        return {
            image: image,
            name:"",
            email:"",
            interests:"",
            isEditMode: false
        }
    },
   async created(){
   const userData = await this.fetchUserProfile()
   this.name = userData.name
   this.email = userData.email
   this.interests = userData.interests
    },
    methods:{
     async   handleUpdateProfile(){
            const payload ={
        name: this.name,
        email: this.email,
        interests: this.interests
    }
    const resJson = await this.updateUserProfile(payload)
    console.log(resJson)
   
            this.isEditMode = false
},

handleEditProfile(){
    
     
 this.isEditMode = true
 },

async fetchUserProfile(){
  const res = await fetch('get-profile')
  return await res.json()
}, 

async updateUserProfile(payload){
   const res = await fetch('update-profile',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    return await res.json()
}
    }
}


</script>
<style>
img{
    width: 320px;
    height: 270px;
    display: block;
    margin-bottom: 40px;
}
div{
    margin: auto;
    width: 80%;
    margin: 40px auto;
   
}
hr{
    width: 500px;
    margin-left: 0;
    margin-top: 25px;
    margin-bottom: 25px;
}
button{
    width: 160px;
    font-size: 15px;
    height: 45px;
    border-radius: 5px;
}
input{
    width: 200px;
    font-size: 15px;
    padding: 10px;

}

</style>