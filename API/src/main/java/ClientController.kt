import io.javalin.Context
import org.eclipse.jetty.http.HttpStatus

data class DataDni(var prueba: String,
                   var document: Int)

data class DataClient(val name : String,
                      var surname:String,
                      var address : String ,
                      val email : String,
                      var telephone: String,
                      var dni: Int)

//la idea es que la notas pueda agregar cosas relevantes del bicho
data class DataPet(var code : Int,
                   var petName:String,
                   var ownerDni: Int,
                   var notes:String )

class ClientController {
    val veteApp = VeteApp

    fun addClient(ctx: Context) {
        val client = ctx.body<DataClient>()

        veteApp.createClient(client.dni,
                             client.name,
                             client.surname,
                             client.address,
                             client.email,
                             client.telephone)
        ctx.status(HttpStatus.CREATED_201)
    }

    fun addPet(ctx: Context){

        val pet= ctx.body<DataPet>()
            veteApp.createPet(pet.petName,pet.ownerDni,pet.notes)
        ctx.status(HttpStatus.CREATED_201)
    }
    fun getClientByDni(ctx: Context){
        val dni = ctx.pathParam("dni").toInt()
        var dataClient : DataClient

        var client = veteApp.getClientById(dni)
        dataClient = DataClient(client.name, client.lastname, client.address, client.email, client.telephone, client.dni)

        ctx.json(dataClient)
    }
    fun getPetsByDni(ctx: Context){
        val dni = ctx.pathParam("dni").toInt()
        var dataPets = ArrayList<DataPet>()

        var pets = veteApp.getOwnersPets(dni)
        pets.forEach { dataPets.add(DataPet(it.code, it.petName, dni, it.notes)) }

        ctx.json(dataPets)
        ctx.status(HttpStatus.OK_200)
    }

    fun getClientsByName(ctx: Context){

        val name = ctx.pathParam("name")
        val dataClients = ArrayList<DataClient>()

        val clients = veteApp.getSearchedClientsByName(name)
        clients.forEach { dataClients.add(DataClient(it.name,it.lastname,it.address,it.email,it.telephone,it.dni))}

        ctx.json(dataClients)
        ctx.status(HttpStatus.OK_200)
    }
}
//en postman el post en la ruta localhost:7000/add_client con el siguiente jason en el body .   
/*{

    "name": "Clark",
    "surname":"Kent",
    "address": "Calle falsa 123",
    "email":"superman@mail.com",
    "telephone":"12221212",
    "dni":"355572834"
}*/

//para agregar una mascota post localhost:7000/add_pet

/*	{
    "petName": "Robin",
    "ownerDni":123456,
    "notes": "es un buen gato"
    }
 */


/*localhost:7000/pets_by_dni
para buscar los pets del dueño

    {
        "dni": 24543234

    }


 */