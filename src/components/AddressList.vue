<template>
    <div>
        <h1>List of Addresses</h1>
        <!-- <div
        v-for="(address in addresses" v-bind:key="address.id">
        {{address.firstName}}
        </div> -->
        
    </div>
</template>

<script>
import AddressService from '../AddressService'
export default {
    name: 'AddressList',
    data: () => {
        return {
            addresses: [],
            error: ''
        }
    },
    async created() {
        try{
            let res = await AddressService.getAllAddresses()
            console.log(res)
            this.addresses = res.data
        } catch(err) {
            this.error = err.message
        } 
    }
}
</script>

<style lang="">
    
</style>