//
// Generated by RollupLiqMulticountryJSON2Apex http://RollupLiqMulticountryJSON2Apex.herokuapp.com/
//

@IsTest
public class RollupLiqMulticountryJSON2Apex_Test {
    
    // This test method should give 100% coverage
    static testMethod void testParse() {
        String json = '{\"totalSize\":10,\"done\":true,\"records\":[{\"attributes\":{\"type\":\"AggregateResult\"},\"SKU_Code__c\":\"000000000000696510\",\"Brand_Name__c\":\"ORGANIC\",\"SKU_Description__c\":\"GLYPHOSATE 48% SL (E) - 1 LTR HDPE\",\"expr0\":0.0,\"expr1\":0.0,\"expr2\":0.0,\"expr3\":0.0,\"expr4\":0.0,\"expr5\":0.0,\"expr6\":90.0}]}';
        RollupLiqMulticountryJSON2Apex r = RollupLiqMulticountryJSON2Apex.parse(json);
        System.assert(r != null);

        json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
        RollupLiqMulticountryJSON2Apex objRollupLiqMulticountryJSON2Apex = new RollupLiqMulticountryJSON2Apex(System.JSON.createParser(json));
        System.assert(objRollupLiqMulticountryJSON2Apex != null);
        System.assert(objRollupLiqMulticountryJSON2Apex.totalSize == null);
        System.assert(objRollupLiqMulticountryJSON2Apex.done == null);
        System.assert(objRollupLiqMulticountryJSON2Apex.records == null);

        json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
        RollupLiqMulticountryJSON2Apex.Attributes objAttributes = new RollupLiqMulticountryJSON2Apex.Attributes(System.JSON.createParser(json));
        System.assert(objAttributes != null);
        System.assert(objAttributes.type_Z == null);

        json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
        RollupLiqMulticountryJSON2Apex.Records objRecords = new RollupLiqMulticountryJSON2Apex.Records(System.JSON.createParser(json));
        System.assert(objRecords != null);
        System.assert(objRecords.attributes == null);
        System.assert(objRecords.SKU_Code == null);
        System.assert(objRecords.Brand_Name == null);
        System.assert(objRecords.SKU_Description == null);
        System.assert(objRecords.expr0 == null);
        System.assert(objRecords.expr1 == null);
        System.assert(objRecords.expr2 == null);
        System.assert(objRecords.expr3 == null);
        System.assert(objRecords.expr4 == null);
        System.assert(objRecords.expr5 == null);
        System.assert(objRecords.expr6 == null);
    }
}