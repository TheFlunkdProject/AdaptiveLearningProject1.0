function findCourseOrTopic(courseOrTopic) {
	
	var searchInputElement = gEBI('selected'+courseOrTopic+'Name');
	var searchInput = searchInputElement.value;
	if (!searchInput) return;
	var theForm = gEBN('savePublishForm');
	
	var formData = new FormData(theForm);
	formData.append('query', searchInput);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'find-course-or-topic.php?query=' + searchInput+'&courseOrTopic='+courseOrTopic, true);
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			alert(xhr.responseText);
			var jj = JSON.parse(xhr.responseText);
			if (jj.status == "success") {
				if (courseOrTopic == "Course") {
					updateListContainer(jj.courseList, gEBI('courseSearchResultList'), "Course", "search");
				} else {
					updateListContainer(jj.topicList, gEBI('topicSearchResultList'), "Topic", "search");
					
				}
			} else {
				if (jj.sqlMessages) {
					alert(jj.sqlMessages);
				}
			}
		} else {
			alert('An error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}




function updateSelecedTopicOrCourseInfo(listItem, courseOrTopic) {
	showTopicOrCourseSelection(listItem, courseOrTopic);
	getCourseOrTopicInfo(courseOrTopic);
}

function showTopicOrCourseSelection(listItem, courseOrTopic) {
	var ID = getNumberAtStringEnd(listItem.id),
		Name = listItem.innerHTML,
		selectedName = gEBI('selected'+courseOrTopic+'Name'),
		selectedID = gEBI('selected'+courseOrTopic+'ID');
	
	selectedName.value = Name;
	selectedID.value = ID;
	
	selectedName.className += ' valueInserted';
}



function getCourseOrTopicInfo(courseOrTopic) {
	var topicID = gEBI('selectedTopicID').value;
	if (!topicID && courseOrTopic == "Topic") {
		alert('Please select a topic');
		return;
	}
	
	var courseID = gEBI('selectedCourseID').value;
	if (!courseID && courseOrTopic == "Course") {
		alert('Please select a course');
		return;
	}
	
	var theForm = gEBN('savePublishForm');
	
	
	var formData = new FormData(theForm);//theForm
	formData.append('courseID', courseID);
	formData.append('topicID', topicID);
	formData.append('courseOrTopic', courseOrTopic);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	if (courseOrTopic == "Course") {
		xhr.open('POST', 'get-topics-in-course.php', true);
	} else {
		xhr.open('POST', 'get-courses-with-topic.php', true);
	}
	//xhr.setRequestHeader("Content-type", "multipart/form-data");
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			//alert(xhr.responseText);
			var jj = JSON.parse(xhr.responseText);
			if (jj.status == "success") {
			
				if (courseOrTopic == "Course") {
					updateListContainer(jj.topicList, gEBI('courseTopicsList'), 'Course', "context");
				} else {
					updateListContainer(jj.courseList, gEBI('topicCoursesList'), 'Topic', "context");
				}
					
			} else {
				if (jj.sqlMessages) {
					alert(jj.sqlMessages);
				}
			}
			
		} else {
			alert('An error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}



function updateListContainer(list, listContainer, courseOrTopic, searchOrContext) {
	removeChildren(listContainer);
	addChildrenToTopicList(listContainer, list, courseOrTopic, searchOrContext);
	applyJS.courseOrTopicSelected(courseOrTopic, searchOrContext); // "Course" for "Topic" actually currently
}

function addChildrenToTopicList(listContainer, list, courseOrTopic, searchOrContext) {
	
	// Cycle through the listContainer and determine if each item is a topic or a section:
	if (!addListItemsToList(listContainer, list)) {
		var topicOrCourse = otherString(courseOrTopic, ["Course","Topic"]);
		gEBI('selected'+topicOrCourse+'Name').click();
		gEBI('selected'+topicOrCourse+'ID').value = '';
	}
	
	if (searchOrContext == "search") {
		var newList = [];
		for (var i=0; i<listContainer.childNodes.length; i++) {
			newList.push(listContainer.childNodes[i]);
		}
		newList.push(gEBI('selected'+courseOrTopic+'Name'));
		if (courseOrTopic == "Topic") {
			createFocusGroup(newList,[gEBI('topicSearchResultList')]);
		} else {
			createFocusGroup(newList,[gEBI('courseSearchResultList')]);
		}
		showElement(courseOrTopic.toLowerCase()+'SearchResultList');
	}
}



function addListItemsToList(listContainer, list) {
	var selectedItemBelongs = false;
	for (var i=0; i<list.length; i++) {
		if (list[i]['courseID']) {
			var type = {
				Name : "courseName",
				ID : "courseID",
				classname : 'imageListItem',
				listType : "topicCoursesListItem",
				selectedItemName : "selectedCourseName"
			};
			if(addItemToList(listContainer, list[i], type)) selectedItemBelongs = true;
			
		} else if (list[i]['topicID']) {
			var type = {
				Name : "topicName",
				ID : "topicID",
				classname : 'imageListItem',
				listType : "courseTopicsListItem",
				selectedItemName : "selectedTopicName"
			};
			if(addItemToList(listContainer, list[i], type)) selectedItemBelongs =true;
			
		} else if (list[i]['sectionID']) {
			var type = {
				Name : "sectionName",
				ID : "sectionID",
				classname : 'imageListSection',
				listType : "courseTopicsListSection",
				selectedItemName : ""
			};
			addItemToList(listContainer, list[i], type);
			
		} else {
			alert('Not topic nor section');
		}
	}
	return selectedItemBelongs;
}

function addItemToList(listContainer, listItem, type) {
	// Mark the already selected topic:
	var selectedItemBelongs = false;
	if (type.selectedItemName) {
		var selectedItemName = gEBI(type.selectedItemName).value;
		if (listItem[type.Name] == selectedItemName) {
			type.classname += ' selectedListItem';
			selectedItemBelongs = true;
		}
	}
	
	var newItem = createEl('div',['className',type.classname,'id',type.listType+listItem[type.ID],
		"tabindex","-1"]);
	var courseName = document.createTextNode(listItem[type.Name]);
	appendNextElementsInList([newItem,courseName, listContainer,newItem]);
	return selectedItemBelongs;
}







function getCourseOrTopicListChildren(courseOrTopic, searchOrContext){
	var list;
	if (courseOrTopic == "Course") {
		alert("as if a course were searched for");
		if (searchOrContext == "search") {
			list = gEBI('courseSearchResultList').childNodes;
		} else if (searchOrContext == "context") {
			list = gEBI('topicCoursesList').childNodes;
		}
	} else if (courseOrTopic == "Topic") {
		alert("as if a topic were searched for");
		if (searchOrContext == "search") {
			list = gEBI('topicSearchResultList').childNodes;
		} else if (searchOrContext == "context") {
			list = gEBI('courseTopicsList').childNodes;
		}
	}
	return list;
}


