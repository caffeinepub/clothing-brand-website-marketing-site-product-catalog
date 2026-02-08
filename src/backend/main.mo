import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  type ProductId = Text;
  type CollectionId = Text;

  type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Text;
    imageUrl : Text;
    available : Bool;
    tags : [Text];
    sizeVariants : ?[Text];
    colorVariants : ?[Text];
    collectionId : CollectionId;
  };

  type Collection = {
    id : CollectionId;
    name : Text;
    description : Text;
    imageUrl : Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  let collections = Map.empty<CollectionId, Collection>();
  let products = Map.empty<ProductId, Product>();
  let contactMessages = List.empty<ContactMessage>();

  public shared ({ caller }) func createCollection(id : CollectionId, name : Text, desc : Text, image : Text) : async () {
    if (collections.containsKey(id)) { Runtime.trap("Collection already exists, select another name.") };
    let collection : Collection = {
      id;
      name;
      description = desc;
      imageUrl = image;
    };
    collections.add(id, collection);
  };

  public shared ({ caller }) func addProduct(id : ProductId, name : Text, desc : Text, price : Text, image : Text, available : Bool, tags : [Text], sizes : ?[Text], colors : ?[Text], collectionId : CollectionId) : async () {
    if (products.containsKey(id)) { Runtime.trap("Product already exists, select another name.") };
    let product : Product = {
      id;
      name;
      description = desc;
      price;
      imageUrl = image;
      available;
      tags;
      sizeVariants = sizes;
      colorVariants = colors;
      collectionId;
    };
    products.add(id, product);
  };

  public query ({ caller }) func getCollection(id : CollectionId) : async Collection {
    switch (collections.get(id)) {
      case (null) { Runtime.trap("Collection does not exist") };
      case (?collection) { collection };
    };
  };

  public query ({ caller }) func getProduct(id : ProductId) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProductsByCollection(collectionId : CollectionId) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.collectionId == collectionId }
    );
  };

  public query ({ caller }) func getAllCollections() : async [Collection] {
    collections.values().toArray();
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text, timestamp : Int) : async () {
    let contactMsg : ContactMessage = {
      name;
      email;
      message;
      timestamp;
    };
    contactMessages.add(contactMsg);
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };
};
