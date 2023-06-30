@isTest
global class ProductFilterMock implements HttpCalloutMock{
    // Implement this interface method
    global static HTTPResponse respond(HTTPRequest req) {
        HTTPResponse response = new HTTPResponse();
        // Setting the response body
        response.setBody('{"data":[{"id":98,"name":"Aguacate","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":29,"name":"algod\u00f3n","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":125,"name":"Arracacha","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":4,"name":"Arroz","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":5,"name":"Banano","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":7,"name":"Caf\u00e9","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":34,"name":"Ca\u00f1a de Az\u00facar","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":85,"name":"Cebolla de bulbo","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":13,"name":"C\u00edtricos","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":42,"name":"Frijol","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":121,"name":"Lima","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":119,"name":"Lim\u00f3n","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":17,"name":"Ma\u00edz","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":120,"name":"Mandarina","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":129,"name":"Millo","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":128,"name":"\u00d1ame","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":84,"name":"Naranja","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":55,"name":"Palma Africana","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":19,"name":"Palma De Aceite","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":20,"name":"Papa","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":59,"name":"pastos","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":65,"name":"Potreros","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":126,"name":"R\u00e1bano","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":66,"name":"reas no agr\u00edcolas","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":127,"name":"Remolacha","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":71,"name":"sorgo","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":72,"name":"Soya","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":122,"name":"Tangelo","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":24,"name":"Tomate","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":123,"name":"Toronja","display_name":null,"light_color":null,"dark_color":null,"status":1},{"id":124,"name":"Zanahoria","display_name":null,"light_color":null,"dark_color":null,"status":1}],"select_name":"Selecciona cultivo","code":200,"message":"Category details fetched successfully."}');
        // Setting the response header
        response.setHeader('Content-Type', 'application/json');
        // Setting the response code
        response.setStatusCode(200);
        // Returning the response
        return response;
    }
}