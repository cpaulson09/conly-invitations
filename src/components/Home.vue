<template lang="">
    <div>
        <v-container class="mt-6">
            <v-row >
                <v-col align='center'>

                <h1>Submit your information to receive an invitation</h1>
                </v-col>
            </v-row>
        </v-container>
        <v-container >
            <v-row>
                <v-col
                cols="12"
                xs="11"
                sm="11"
                md="4"
                align='center'
                >
                    <!-- <v-carousel cycle hide-delimiters>
                        <v-carousel-item
                        v-for="image in images"
                        :key="image.alt"
                        :src="image.src"
                        ></v-carousel-item>
                    </v-carousel> -->
                    <v-img
                    max-height="400"
                    max-width="300"
                    src="../assets/conly2.jpeg"
                    ></v-img>
                </v-col>
                <v-col
                cols="12"
                xs="8"
                sm="8"
                md="8"
                align='center'
                >
                    <v-row align="center">
                        <v-col
                        cols="12"
                        xs="8"
                        sm="6"
                        md="4"
                        >
                            <v-text-field
                                label="First Name"
                                outlined
                                v-model="firstName"
                            ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        xs="8"
                        sm="6"
                        md="4"
                        >
                            <v-text-field
                                label="Last Name*"
                                outlined
                                v-model="lastName"
                                required
                            ></v-text-field>
                        </v-col>
                    
                        <v-col
                        cols="12"
                        xs="8"
                        sm="6"
                        md="4"
                        >
                            <v-text-field
                                label="Street Address*"
                                outlined
                                placeholder="1234 address"
                                v-model="address"
                            ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        xs="8"
                        sm="6"
                        md="4"
                        >
                            <v-text-field
                                label="City*"
                                outlined
                                placeholder="City*"
                                v-model="city"
                            ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        xs="8"
                        sm="6"
                        md="3"
                        >
                            <v-text-field
                                label="State*"
                                outlined
                                placeholder="UT"
                                text
                                maxlength="2"
                                v-model="state"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        xs="8"
                        sm="6"
                        md="3"
                        >
                            <v-text-field
                                label="Zip / Postal Code*"
                                outlined
                                placeholder="Zip"
                                text
                                maxlength="11"
                                v-model="zip"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row align="center" class="pa-n16">
                        <v-col
                        cols="12"
                        xs="8"
                        sm="6"
                        md="4"
                        >
                        <p style="color: gray">* - required field </p>
                        </v-col>
                    </v-row>
                    <v-row class="pb-16">
                        <v-col
                        cols="12"
                        xs="3"
                        sm="3"
                        md="2"
                        aligncenter
                        class="pb-10"
                        >
                            <v-btn
                                depressed
                                elevation="6"
                                x-large
                                color="green lighten-2"
                                v-on:click="onSubmit"
                            >
                            Submit
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            
        </v-container>
        <v-snackbar 
            align="center"
            v-model="snackbar"
            :timeout="5000"
            :color="responseBackgroundColor"
            :multi-line="multiLine"
            >
            {{ response.message }}
        </v-snackbar>
        <!-- <div>
        <ul >
            <li v-for="item in addresses" :key="item.id">
                {{ item }}
            </li>
        </ul>
        </div> -->
    </div>
</template>

<script>
import AddressService from '../AddressService'
export default {
    name: "Home",

    data: function () {
        return{
            firstName: "",
            lastName:  "",
            address:  "",
            city: "",
            state: "",
            zip: "" ,
            response: '',
            responseBackgroundColor: '',
            responseTextColor: '',
            multiLine: true,
            snackbar: false,
            addresses: [],
            images: [
                {src: "../assets/conly2.jpeg", alt: "conly1"},
                {src: "../assets/conly.jpg", alt: "conly2"}
            ]
        }
    },

    methods: {
        onSubmit: async function () {
            this.response = ''
            this.responseBackgroundColor = ''
            this.responseTextColor = ''
            // if all fields have a value
            if ( this.lastName != '' 
            && this.address != '' 
            && this.city != '' 
            && this.state != '' 
            && this.zip != '' ){

                let data = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    address: this.address,
                    city: this.city,
                    state: this.state,
                    zip: this.zip
                }
                let res = await AddressService.AddAddress(data)

                if (res !== undefined){
                    this.response = res.data
                    if (res.data.status === 'success') {
                        this.responseBackgroundColor = 'green'
                        this.resetFields()
                    }
                    else if(res.data.status === 'error') this.responseBackgroundColor = 'red darken-1'
                }
                else {
                    this.response = {status: "error", message: "Unable to connect to server.\n Refresh the page or try again later."}
                    this.responseBackgroundColor = 'red darken-1'
                }

                this.snackbar = true
            }
            else {
                this.response = {status: "warning", message: "Please fill required (*) fields before submitting"}
                this.responseBackgroundColor = 'yellow darken-4'
                this.snackbar = true
            }
            
            // let res2 = await AddressService.getAllAddresses()
            // this.addresses = res2.data
        },

        resetFields: function() {
            this.firstName = ''
            this.lastName = ''
            this.address = ''
            this.city = ''
            this.state = ''
            this.zip = ''
        }
    },

    async created() {
        try{
            let res = await AddressService.getAllAddresses()
            this.addresses = res.data
        } catch(err) {
            this.error = err.message
        } 
    }

}
</script>

<style lang="">

</style>