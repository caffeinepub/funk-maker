import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Pattern = {
    id : Nat;
    name : Text;
    data : [[Nat]];
  };

  public type UserProfile = {
    name : Text;
  };

  type UserPatterns = Map.Map<Text, Pattern>;

  let patternsStorage = Map.empty<Principal, UserPatterns>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Pattern management
  public shared ({ caller }) func savePattern(pattern : Pattern) : async () {
    _ensureAuthenticated(caller);

    let userPatterns = switch (patternsStorage.get(caller)) {
      case (null) {
        let newPatterns = Map.empty<Text, Pattern>();
        patternsStorage.add(caller, newPatterns);
        newPatterns;
      };
      case (?existingPatterns) { existingPatterns };
    };

    userPatterns.add(pattern.name, pattern);
  };

  public query ({ caller }) func loadPattern(name : Text) : async ?Pattern {
    _ensureAuthenticated(caller);

    switch (patternsStorage.get(caller)) {
      case (null) { null };
      case (?userPatterns) { userPatterns.get(name) };
    };
  };

  public query ({ caller }) func getAllPatterns() : async [Pattern] {
    _ensureAuthenticated(caller);

    switch (patternsStorage.get(caller)) {
      case (null) { [] };
      case (?userPatterns) { userPatterns.values().toArray() };
    };
  };

  func _ensureAuthenticated(caller : Principal) {
    if (AccessControl.getUserRole(accessControlState, caller) == #guest) {
      Runtime.trap("User must be authenticated");
    };
  };
};
