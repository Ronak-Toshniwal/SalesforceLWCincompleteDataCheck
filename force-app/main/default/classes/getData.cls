public with sharing class getData {
   @AuraEnabled(cacheable=true)
    public static list<account> getAccountData() {
        return [select id, name, site, rating, phone from account where name = null OR site = null or rating = null or phone = null LIMIT 10];
    }
}
