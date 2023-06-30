//Generated by wsdl2apex

public class tempuriOrg_Auth {
    
    public class GenerateTokenResponse_element {
        public String GenerateTokenResult;
        @TestVisible private String[] GenerateTokenResult_type_info = new String[]{'GenerateTokenResult','http://tempuri.org/',null,'0','1','true'};
            @TestVisible  private String[] apex_schema_type_info = new String[]{'http://tempuri.org/','true','false'};
                @TestVisible  private String[] field_order_type_info = new String[]{'GenerateTokenResult'};
                    }
    public class GenerateToken_element {
        public String username;
        public String password;
        @TestVisible  private String[] username_type_info = new String[]{'username','http://tempuri.org/',null,'0','1','true'};
            @TestVisible private String[] password_type_info = new String[]{'password','http://tempuri.org/',null,'0','1','true'};
                @TestVisible  private String[] apex_schema_type_info = new String[]{'http://tempuri.org/','true','false'};
                    @TestVisible  private String[] field_order_type_info = new String[]{'username','password'};
                        }
    public class soap1 {
        
        //  public String endpoint = 'https://crmsp.uplonline.com/TokenService.svc/soap1';
        public String endPoint;
        public Map<String,String> inputHttpHeaders_x;
        public Map<String,String> outputHttpHeaders_x;
        public String clientCertName_x;
        public String clientCert_x;
        public String clientCertPasswd_x;
        public Integer timeout_x;
        
        private String[] ns_map_type_info = new String[]{'http://tempuri.org/', 'tempuriOrg_Auth', 'http://schemas.microsoft.com/2003/10/Serialization/', 'schemasMicrosoftCom200310Serializat_Auth'};
            
            public String GenerateToken(String username,String password) {
                List<SharePointAuthentication__c> slist = SharePointAuthentication__c.getall().values();
                endPoint = slist[0].EndPoint__c;
                system.debug('Endpoint for Authentication : '+slist[0].Endpoint__c);
                tempuriOrg_Auth.GenerateToken_element request_x = new tempuriOrg_Auth.GenerateToken_element();
                request_x.username = username;
                request_x.password = password;
                tempuriOrg_Auth.GenerateTokenResponse_element response_x;
                Map<String, tempuriOrg_Auth.GenerateTokenResponse_element> response_map_x = new Map<String, tempuriOrg_Auth.GenerateTokenResponse_element>();
                response_map_x.put('response_x', response_x);
                WebServiceCallout.invoke(
                    this,
                    request_x,
                    response_map_x,
                    new String[]{endpoint,
                        'http://tempuri.org/ITokenService/GenerateToken',
                        'http://tempuri.org/',
                        'GenerateToken',
                        'http://tempuri.org/',
                        'GenerateTokenResponse',
                        'tempuriOrg_Auth.GenerateTokenResponse_element'}
                );
                response_x = response_map_x.get('response_x');
                return response_x.GenerateTokenResult;
                
            }
    }
    
    
}