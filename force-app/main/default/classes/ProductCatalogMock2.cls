@isTest
global class ProductCatalogMock2 implements HttpCalloutMock {
    // Implement this interface method
    global static HTTPResponse respond(HTTPRequest req) {
        HTTPResponse response = new HTTPResponse();
        // Setting the response body
      //** */  //response.setBody('{"data":{"productDetailsResponse":{"id":111,"name":"SAFARI","meta_title":null,"meta_description":"Banano,Cafu00e9,Mau00edz,Naranja,Palma Africana,Potreros,,Glufosinato de Amonio","product_meta_description":null,"product_name_image":null,"banner_name":null,"thumbnail_name":null,"large_name":null,"thumbnail_image":null,"banner_image":"https://co.uplonline.com/images/products/products-details-landing.jpg","large_image":null,"product_logo_image":"https://co.uplonline.com/product-logo/kwmrQrsSkgN2YA3mJoGiB7VuUx8Mib0ANaUq866T.png","header_image":null,"video_link":null,"is_arysta":1,"is_special":0,"amount":null,"mapp_number":null,"status":1,"formulation":"formulation","registration_info":null,"product_url":"safari","type":"Herbicidas","fact":null,"product_type_logo":"https://co.uplonline.com/product_type/logos/herbicide_icon.png","leaf_image":"https://co.uplonline.com/product_type/leafs/yIYVj9dsdzzKjFff6rxPUR58rYsrdyGXOvxlfjGl.png","view_link":"co/product-details/safari","description":"<p>SAFARIu00ae es un herbicida post emergente no selectivo con acciu00f3n de contacto para el control de malezas gramu00edneas, hojas anchas y arbustivas leu00f1osas y semileu00f1osas en una amplia diversidad de cultivos, potreros y u00e1reas no agru00edcolas.</p>","productImages":[],"ingredients":[{"id":73,"name":"Glufosinato de Amonio","unit":null,"quantity":null}],"productTypes":{"id":1,"name":"herbicide","display_name":"Herbicidas","light_color":"#28a44a","dark_color":"#28a44a"},"crops":[{"id":98,"name":"Aguacate"},{"id":5,"name":"Banano"},{"id":7,"name":"Cafu00e9"},{"id":17,"name":"Mau00edz"},{"id":84,"name":"Naranja"},{"id":55,"name":"Palma Africana"},{"id":65,"name":"Potreros"}],"targets":[{"id":133,"name":"Amor de hombre (Tradescantia fluminensis)"},{"id":120,"name":"Amor seco"},{"id":161,"name":"Amor seco (Bidens pilosa)"},{"id":77,"name":"Arroz (Oryza Sativa)"},{"id":123,"name":"Batatilla (Ipomea purpurea)"},{"id":131,"name":"Berlitas (Emilia sanchifolia)"},{"id":9,"name":"Bledo (Amaranthus Dubius)"},{"id":121,"name":"Botu00f3n de Oro"},{"id":139,"name":"Brachiaria (Brachiaria decumbens)"},{"id":173,"name":"Cadillo (Cenchrus equinatus)"},{"id":122,"name":"Cadillo (Desmonium uncinatum)"},{"id":134,"name":"Cortadera (Cyperus esculentum)"},{"id":163,"name":"Digitaria (Digitaria sanguinalis)"},{"id":73,"name":"Digitaria Sp"},{"id":27,"name":"Dormidera (Mimosa Spp)"},{"id":30,"name":"Falsa Caminadora (Ischaemum Rugosum)"},{"id":124,"name":"Falso Tru00e9bol (Oxalis latifolia)"},{"id":135,"name":"Fosforito (Kyllinga sesquiflora)"},{"id":140,"name":"Grama conejo (Oplisnemus burmanii)"},{"id":125,"name":"Gualola (Persicaria nepalensis)"},{"id":34,"name":"Guardarocu00edo (Digitaria Sanguinalis)"},{"id":132,"name":"Guasca (Galinsoga ciliata)"},{"id":129,"name":"Malezas Ciperu00e1ceas"},{"id":128,"name":"Malezas de Hoja Ancha"},{"id":130,"name":"Malezas Gramu00edneas"},{"id":138,"name":"Pasto comu00fan (Penisetum clandestinum)"},{"id":49,"name":"Pata De Gallina (Eleusine Indica)"},{"id":136,"name":"Rynchospora radicans."},{"id":60,"name":"Suelda Con Suelda (Commelina Difussa)"},{"id":66,"name":"Verdolaga (Portulaca Oleracea)"}]},"productTestimonialResponse":null,"productAdditionalInfoResponse":[{"id":39,"title":"Presentaciu00f3n","description":"<p>1, 4, 20, 200 litros</p>","sectionImages":[]},{"id":40,"title":"Categoru00eda Toxicolu00f3gica","description":"<p>II - Moderadamente Peligroso</p>","sectionImages":[]}],"productOtherFilesResponse":[],"productLabelFileResponse":{"id":101,"file_link":"https://co.uplonline.com/download_links/eHdUfGtA0HPh9J0reFlSNFAI7yIdkhL1vRDpBF1K.pdf","file_name":"F.T. SAFARI (vr.1-2019)","file_display_name":null,"file_label":"label","pdf_link":null,"pdf_link_text":null,"pdf_icon_image":"https://co.uplonline.com/images/products/PDF_icon.png"},"productMsdsFileResponse":{"id":102,"file_link":null,"file_name":"","file_display_name":null,"file_label":"msds","pdf_link":null,"pdf_link_text":null,"pdf_icon_image":null},"productTankMixFileResponse":{"id":103,"file_link":null,"file_name":"","file_display_name":null,"file_label":"tank","pdf_link":null,"pdf_link_text":null,"pdf_icon_image":null},"productEisFileResponse":{"id":104,"file_link":null,"file_name":"","file_display_name":null,"file_label":"eis","pdf_link":null,"pdf_link_text":null,"pdf_icon_image":null}},"code":200,"message":"data fetched successfully."}');
         response.setBody('{"data":{"productDetailsResponse":{"id":10,"name":"Devrinol 450 SC","meta_title":null,"meta_description":",,napropamid","product_meta_description":null,"product_name_image":null,"banner_name":null,"thumbnail_name":null,"large_name":null,"thumbnail_image":null,"banner_image":"https://pl.uplonline.com/images/products/products-details-landing.jpg","large_image":null,"product_logo_image":null,"header_image":null,"video_link":null,"is_arysta":0,"is_special":0,"amount":null,"mapp_number":null,"status":1,"formulation":"<p><strong>napropamid</strong> (zwiu0105zek z grupy amidu00f3w) u2012 450 g/l</p>","registration_info":null,"product_url":"devrinol-450-sc","type":"Herbicydy","fact":null,"product_type_logo":"https://pl.uplonline.com/product_type/logos/vwtrpremXmXwt8o1UQaLS1lAtqPJXItsNwKtIFib.png","leaf_image":"https://pl.uplonline.com/product_type/leafs/yIYVj9dsdzzKjFff6rxPUR58rYsrdyGXOvxlfjGl.png","view_link":"pl/produkty/devrinol-450-sc","description":"test","productImages":[],"ingredients":[{"id":19,"name":"napropamid","unit":"g/l","quantity":450}],"productTypes":{"id":1,"name":"herbicide","display_name":"Herbicydy","light_color":"#28a44a","dark_color":"#28a44a"},"crops":[{"id":91,"name":"agrest"},{"id":18,"name":"kapusta gu0142owiasta"},{"id":92,"name":"malina"},{"id":33,"name":"pomidor"},{"id":95,"name":"porzeczka biau0142a"},{"id":93,"name":"porzeczka czarna"},{"id":94,"name":"porzeczka czerwona"},{"id":41,"name":"rzepak ozimy"},{"id":47,"name":"truskawka"}],"targets":[{"id":3,"name":"chwastnica jednostronna"},{"id":5,"name":"fiou0142ek polny"},{"id":6,"name":"gorczyca polna"},{"id":7,"name":"gwiazdnica pospolita"},{"id":8,"name":"iglica pospolita"},{"id":11,"name":"komosa biau0142a"},{"id":17,"name":"maruna bezwonna"},{"id":21,"name":"pokrzywa u017cegawka"},{"id":31,"name":"rdest plamisty"},{"id":33,"name":"rdest powojowy"},{"id":37,"name":"rumianek pospolity"},{"id":41,"name":"szaru0142at szorstki"},{"id":42,"name":"tasznik pospolity"},{"id":45,"name":"wiechlina roczna"},{"id":47,"name":"u017cu00f3u0142tlica drobnokwiatowa"}]},"productTestimonialResponse":null,"productAdditionalInfoResponse":[{"id":18,"title":"Zakres Dziau0142ania","description":"test","sectionImages":[]},{"id":19,"title":"Karencja","description":"test","sectionImages":[]},{"id":101,"title":"Dostu0119pne Opakowania","description":null,"sectionImages":[]}],"productOtherFilesResponse":[{"id":513,"file_link":"https://pl.uplonline.com/download_links/SJLfYyIMFT6UUPseEjy4lXvyduMxm0cpMibODBsz.pdf","file_name":"Broszura rolnicza","file_display_name":"Broszura rolnicza","file_label":null,"pdf_link":null,"pdf_link_text":null,"pdf_icon_image":"https://pl.uplonline.com/images/products/PDF_icon.png"},{"id":746,"file_link":null,"file_name":"","file_display_name":null,"file_label":null,"pdf_link":"https://fcopy.info/UPL/Truskawka-i-uprawy-Jagodowe-UPL-2021","pdf_link_text":"Broszura jagodowe","pdf_icon_image":null}],"productLabelFileResponse":{"id":189,"file_link":"https://pl.uplonline.com/download_links/nmTTCX97zguIJrEAWX16aahHTOTJAS8Bd8mX7xQ4.pdf","file_name":"Devrinol 450 SC_2015-07-16_Label edit","file_display_name":"Etykieta rejestracyjna","file_label":"label","pdf_link":null,"pdf_link_text":null,"pdf_icon_image":"https://pl.uplonline.com/images/products/PDF_icon.png"},"productMsdsFileResponse":{"id":780,"file_link":null,"file_name":"","file_display_name":null,"file_label":"msds","pdf_link":null,"pdf_link_text":null,"pdf_icon_image":null},"productTankMixFileResponse":[],"productEisFileResponse":[]},"code":200,"message":"data fetched successfully."}');
        //response.setBody('{"data":{"productDetailsResponse":{"id":111,"name":"SAFARI","meta_title":null,"meta_description":"Banano,Cafu00e9,Mau00edz,Naranja,Palma Africana,Potreros,,Glufosinato de Amonio","product_meta_description":null,"product_name_image":null,"banner_name":null,"thumbnail_name":null,"large_name":null,"thumbnail_image":null,"banner_image":"landing.jpg","large_image":null,"product_logo_image":"kwmrQrsSkgN2YA3mJoGiB7VuUx8Mib0ANaUq866T.png","header_image":null,"video_link":null,"is_arysta":1,"is_special":0,"amount":null,"mapp_number":null,"status":1,"formulation":"Concentrado Soluble - SL","registration_info":null,"product_url":"safari","type":"Herbicidas","fact":null,"view_link":"safari","code":200,"message":"data fetched successfully."}');
        // Setting the response header
        response.setHeader('Content-Type', 'application/json');
        // Setting the response code
        response.setStatusCode(200);
        // Returning the response
        return response;
    }
}