import axios from 'axios'
const url = process.env.VUE_APP_API_URL

class AddressService {
    // List addresses
    static getAllAddresses = () => {
        console.log(url)
        return axios.get(url)
        .catch(err => {
            console.log(err)
        })
    }

    // Create
    static AddAddress = (data) => {
        return axios.post(url, {
            firstName: data.firstName,
            lastName: data.lastName, 
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Delete
    static deleteAddress = (id) => {
        return axios.delete(`${url}${id}`)
    }
}

export default AddressService