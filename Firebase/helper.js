import { async } from "@firebase/util";
import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
	getDoc,
	query,
	where,
	getDocs,
	limit,
	orderBy,
} from "firebase/firestore";
import { firestore } from "./firebase-setup";
import { auth } from "./firebase-setup";

export async function createDiary(diary) {
	//console.log("call create diary function");
	const docRef = await addDoc(collection(firestore, "diary"), {
		photos: diary.photos,
		description: diary.description,
		species: diary.species,
		location: diary.location,
		date: diary.date,
		userId: auth.currentUser.uid,
		userName: diary.userName,
		like: 0,
	});
	console.log("Diary written with ID: ", docRef.id);
}

export async function deleteDiary(id) {
	try {
		//console.log("call delete diary function");
		await deleteDoc(doc(firestore, "diary", id));
		console.log("Document deleted with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function editDiary(id, updateField) {
	try {
		//console.log("call edit diary function");
		const docRef = doc(firestore, "diary", id);
		await updateDoc(docRef, updateField);
		console.log("Document updated with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function getDiaryById(id) {
	try {
		//console.log("call get diary");
		const docRef = doc(firestore, "diary", id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			// console.log(docSnap.data());
			return docSnap.data();
		} else {
			console.log("diary does not exist");
		}
	} catch (err) {
		console.log(err);
	}
}

export async function getDiaryByUser(id) {
	try {
		console.log("call get diaries");
		const q = query(collection(firestore, "diary"), where("userId", "==", id));
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push({ ...doc.data(), diaryId: doc.id });
		});
		// console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}

export function getDiaryQueueByUser(id) {
	// try {
	//console.log("call get diaries");
	const q = query(collection(firestore, "diary"), where("userId", "==", id));
	return q;
}

export function getLatestDiariesQueue() {
	// try {
	//console.log("call get diaries");
	const q = query(
		collection(firestore, "diary"),
		orderBy("date", "desc"),
		limit(10)
	);
	// const querySnapshot = await getDocs(q);
	// const diaries = [];
	// querySnapshot.forEach((doc) => {
	// 	diaries.push(doc.data());
	// });
	// console.log(diaries);
	// return diaries;
	return q;
	// } catch (err) {
	// 	console.log(err);
	// }
}

export async function getDiaryByLocation(location) {
	try {
		// console.log("call get diaries by location");
		const q = query(
			collection(firestore, "diary"),
			where("location", "==", location)
		);
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push(doc.data());
		});
		console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}
export async function getDiaryBySpecies(species) {
	try {
		// console.log("call get diaries by location");
		const q = query(
			collection(firestore, "diary"),
			where("species", "==", species)
		);
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push(doc.data());
		});
		console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}
export async function createProfile(user) {
	//console.log("call create diary function");
	const docRef1 = await addDoc(collection(firestore, "profile"), {
		uid: auth.currentUser.uid,
		// uid: user.id,
		name: user.name,
		email: user.email,
		achievement: ["very", "good"],
		followerCount: 32,
		followingCount: 48,
		headPhoto: "default",
		postCount: 10,
		favouritePlant: "default",
		diaries: ["123", "434", "809"],
	});
	const docRef2 = await addDoc(collection(firestore, "follower"), {
		userUid: auth.currentUser.uid,
		// uid: "12345",
		follower: [],
	});
	const docRef3 = await addDoc(collection(firestore, "following"), {
		userUid: auth.currentUser.uid,
		// uid: "12345",
		following: [],
	});
	console.log("Profile written with ID: ", docRef1.id);
}

export async function editProfile(id, updateField) {
	try {
		//console.log("call edit diary function");
		const docRef = doc(firestore, "profile", id);
		await updateDoc(docRef, updateField);
		console.log("Document updated with ID: ", id);
	} catch (err) {
		console.log(err);
	}
}

export async function getProfileById(id) {
	try {
		//console.log("call get diary");
		const docRef = doc(firestore, "profile", id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			//console.log(docSnap.data());
			return docSnap.data();
		} else {
			console.log("user does not exist");
		}
	} catch (err) {
		console.log(err);
	}
}
export async function getProfileByUid(uid) {
	try {
		//console.log("call get diaries");
		const q = query(collection(firestore, "profile"), where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		const users = [];
		querySnapshot.forEach((doc) => {
			users.push({ ...doc.data(), id: doc.id });
		});
		// console.log(users[0]);
		// console.log(querySnapshot[0].data());
		return users[0];
	} catch (err) {
		console.log(err);
	}
}

export async function getFollowerByUser(uid) {
	try {
		//console.log("call get diaries");
		const q = query(collection(firestore, "follower"), where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		const followers = [];
		querySnapshot.forEach((doc) => {
			followers.push(doc.data());
		});
		//console.log(querySnapshot.data());
		// console.log(followers);
		return followers;
	} catch (err) {
		console.log(err);
	}
}
export async function getFollowingByUser(uid) {
	try {
		//console.log("call get diaries");
		const q = query(
			collection(firestore, "following"),
			where("uid", "==", uid)
		);
		const querySnapshot = await getDocs(q);
		const followings = [];
		querySnapshot.forEach((doc) => {
			followings.push(doc.data());
		});
		// console.log(querySnapshot);
		// console.log(followings);
		return followings;
	} catch (err) {
		console.log(err);
	}
}

export async function searchDiary(species) {
	try {
		// console.log("call get diaries by location");
		const q = query(
			collection(firestore, "diary"),
			where("species", "==", species)
		);
		const querySnapshot = await getDocs(q);
		const diaries = [];
		querySnapshot.forEach((doc) => {
			diaries.push(doc.data());
		});
		console.log(diaries);
		return diaries;
	} catch (err) {
		console.log(err);
	}
}
export async function createLike(diaryId) {
	const docRef = await addDoc(collection(firestore, "like"), {
		diaryId: diaryId,
		likeUsers: [],
	});
	console.log("Like written with ID: ", docRef.id);
}
export async function addLike(diaryId) {
	try {
		//console.log("call add like function");

		const q = query(
			collection(firestore, "like"),
			where("diaryId", "==", diaryId)
		);
		const querySnapshot = await getDocs(q);
		// console.log("qs", querySnapshot);
		const like = [];
		querySnapshot.forEach((docItem) => {
			like.push({ ...docItem.data(), id: docItem.id });
		});
		const likeItem = await like[0];
		//console.log(likeItem);
		const docRef = doc(firestore, "like", likeItem.id);
		updateDoc(docRef, {
			likeUsers: [...likeItem.likeUsers, auth.currentUser.uid],
		});

		const diaryRef = doc(firestore, "diary", diaryId);
		updateDoc(diaryRef, { like: likeItem.likeUsers.length + 1 });
		console.log("Like update with ID: ", docRef.id);
	} catch (err) {
		console.log(err);
	}
}
export async function removeLike(diaryId) {
	try {
		//console.log("call add like function");

		const q = query(
			collection(firestore, "like"),
			where("diaryId", "==", diaryId)
		);
		const querySnapshot = await getDocs(q);
		// console.log("qs", querySnapshot);
		const like = [];
		querySnapshot.forEach((docItem) => {
			like.push({ ...docItem.data(), id: docItem.id });
		});
		const userList = await like[0].likeUsers;
		//console.log(userList);
		const updatedUsers = userList.filter(
			(user) => user !== auth.currentUser.uid
		);
		//console.log(updatedUsers);

		const docRef = doc(firestore, "like", like[0].id);
		updateDoc(docRef, {
			likeUsers: updatedUsers,
		});
		const diaryRef = doc(firestore, "diary", diaryId);
		updateDoc(diaryRef, { like: updatedUsers.length });
		console.log("Like remove with ID: ", docRef.id);
	} catch (err) {
		console.log(err);
	}
}
export async function checkLike(diaryId) {
	try {
		//console.log("call add like function");

		const q = query(
			collection(firestore, "like"),
			where("diaryId", "==", diaryId)
		);
		const querySnapshot = await getDocs(q);
		// console.log("qs", querySnapshot);
		const like = [];
		querySnapshot.forEach((docItem) => {
			like.push({ ...docItem.data(), id: docItem.id });
		});
		const userList = await like[0].likeUsers;
		//console.log(userList);
		return userList.includes(auth.currentUser.uid);
	} catch (err) {
		console.log(err);
	}
}
export async function followUser(userUid) {
	await addFollowing(auth.currentUser.uid, userUid);
	await addFollower(userUid, auth.currentUser.uid);
}

export async function unfollowUser(userUid) {
	await removeFollowing(auth.currentUser.uid, userUid);
	await removeFollower(userUid, auth.currentUser.uid);
}
export async function addFollowing(user, followingUser) {
	try {
		//console.log("call add like function");
		const followingQuery = query(
			collection(firestore, "following"),
			where("userUid", "==", user)
		);
		const followingQuerySnapshot = await getDocs(followingQuery);
		// console.log("qs", querySnapshot);
		const followings = [];
		followingQuerySnapshot.forEach((docItem) => {
			followings.push({ ...docItem.data(), id: docItem.id });
		});
		const following = await followings[0];
		//console.log(likeItem);
		const followingDocRef = doc(firestore, "following", following.id);
		updateDoc(followingDocRef, {
			following: [...following.following, followingUser],
		});
		console.log("Add following with ID: ", followingDocRef.id);
		//console.log("call add like function");

		const profileQuery = query(
			collection(firestore, "profile"),
			where("uid", "==", user)
		);
		const profileQuerySnapshot = await getDocs(profileQuery);
		const profiles = [];
		profileQuerySnapshot.forEach((docItem) => {
			profiles.push({ ...docItem.data(), id: docItem.id });
		});
		const profile = await profiles[0];
		const profileDocRef = doc(firestore, "profile", profile.id);
		//console.log(profile.id);
		updateDoc(profileDocRef, {
			followingCount: following.following.length + 1,
		});
		console.log("Add followingCount for profile with ID: ", profileDocRef.id);
	} catch (err) {
		console.log(err);
	}
}

export async function removeFollowing(user, followingUser) {
	try {
		//console.log("call add like function");
		const followingQuery = query(
			collection(firestore, "following"),
			where("userUid", "==", user)
		);
		const followingQuerySnapshot = await getDocs(followingQuery);
		// console.log("qs", querySnapshot);
		const followings = [];
		followingQuerySnapshot.forEach((docItem) => {
			followings.push({ ...docItem.data(), id: docItem.id });
		});
		const followingList = await followings[0].following;
		//console.log(likeItem);
		const updatedfollowing = followingList.filter(
			(following) => following !== followingUser
		);
		const followingDocRef = doc(firestore, "following", followings[0].id);

		updateDoc(followingDocRef, {
			following: updatedfollowing,
		});
		console.log("Remove following with ID: ", followingDocRef.id);
		//console.log("call add like function");

		const profileQuery = query(
			collection(firestore, "profile"),
			where("uid", "==", user)
		);
		const profileQuerySnapshot = await getDocs(profileQuery);
		const profiles = [];
		profileQuerySnapshot.forEach((docItem) => {
			profiles.push({ ...docItem.data(), id: docItem.id });
		});
		const profile = await profiles[0];
		const profileDocRef = doc(firestore, "profile", profile.id);
		//console.log(profile.id);
		updateDoc(profileDocRef, {
			followingCount: followingList.length - 1,
		});
		console.log("Less followingCount for profile with ID: ", profileDocRef.id);
	} catch (err) {
		console.log(err);
	}
}

export async function addFollower(user, userFollower) {
	try {
		//console.log("call add like function");
		const followerQuery = query(
			collection(firestore, "follower"),
			where("userUid", "==", user)
		);
		const followerQuerySnapshot = await getDocs(followerQuery);
		// console.log("qs", querySnapshot);
		const followers = [];
		followerQuerySnapshot.forEach((docItem) => {
			followers.push({ ...docItem.data(), id: docItem.id });
		});
		const follower = await followers[0];
		//console.log(likeItem);
		const followerDocRef = doc(firestore, "follower", follower.id);
		updateDoc(followerDocRef, {
			follower: [...follower.follower, userFollower],
		});
		console.log("Add follower with ID: ", followerDocRef.id);
		const profileQuery = query(
			collection(firestore, "profile"),
			where("uid", "==", user)
		);
		const profileQuerySnapshot = await getDocs(profileQuery);
		const profiles = [];
		profileQuerySnapshot.forEach((docItem) => {
			profiles.push({ ...docItem.data(), id: docItem.id });
		});
		const profile = await profiles[0];
		//console.log(profile.id);
		const profileDocRef = doc(firestore, "profile", profile.id);
		updateDoc(profileDocRef, {
			followerCount: follower.follower.length + 1,
		});
		console.log("Add followerCount for profile with ID: ", profileDocRef.id);
	} catch (err) {
		console.log(err);
	}
}

export async function removeFollower(user, userFollower) {
	try {
		//console.log("call add like function");
		const followerQuery = query(
			collection(firestore, "follower"),
			where("userUid", "==", user)
		);
		const followerQuerySnapshot = await getDocs(followerQuery);
		// console.log("qs", querySnapshot);
		const followers = [];
		followerQuerySnapshot.forEach((docItem) => {
			followers.push({ ...docItem.data(), id: docItem.id });
		});
		const followerList = await followers[0].follower;
		//console.log(likeItem);
		const updatedfollower = followerList.filter(
			(follower) => follower !== userFollower
		);
		//console.log(likeItem);
		const followerDocRef = doc(firestore, "follower", followers[0].id);
		updateDoc(followerDocRef, {
			follower: updatedfollower,
		});
		console.log("Remove follower with ID: ", followerDocRef.id);
		const profileQuery = query(
			collection(firestore, "profile"),
			where("uid", "==", user)
		);
		const profileQuerySnapshot = await getDocs(profileQuery);
		const profiles = [];
		profileQuerySnapshot.forEach((docItem) => {
			profiles.push({ ...docItem.data(), id: docItem.id });
		});
		const profile = await profiles[0];
		//console.log(profile.id);
		const profileDocRef = doc(firestore, "profile", profile.id);
		updateDoc(profileDocRef, {
			followerCount: followerList.length - 1,
		});
		console.log("Less followerCount for profile with ID: ", profileDocRef.id);
	} catch (err) {
		console.log(err);
	}
}
export async function checkFollowingRelation(userUid) {
	try {
		//console.log("call add like function");
		const q = query(
			collection(firestore, "following"),
			where("userUid", "==", auth.currentUser.uid)
		);
		const querySnapshot = await getDocs(q);
		// console.log("qs", querySnapshot);
		const followings = [];
		querySnapshot.forEach((docItem) => {
			followings.push({ ...docItem.data(), id: docItem.id });
		});
		const followingList = await followings[0].following;
		//console.log(userList);
		// console.log(followingList);
		return followingList.includes(userUid);
	} catch (err) {
		console.log(err);
	}
}
