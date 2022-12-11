$(document).ready(function ()
{
	let studentPhotoUrl = "";
	let fatherPhotoUrl = "";
	let motherPhotoUrl = "";
	let fatherSignUrl = "";
	let motherSignUrl = "";


	// function formfill() 
	// {
	// 	$("#txtStudentName").val("asdff");
	// 	$("#dateDOB").val("2020-02-02");
	// 	// $("#ddlStudentSex").val("asdff");
	// 	$("#txtBloodgroup").val("asdff");
	// 	$("#txtNationality").val("asdff");
	// 	$("#txtReligion").val("asdff");
	// 	$("#txtMotherTongue").val("asdff");

	// 	// $("#ddlSingleParent").val("asdff");
	// 	// $("#ddlLegalGuardian").val("asdff");
	// 	$("#txtContactNo").val("83762493");
	// 	$("#txtMobile").val("736493");
	// 	$("#txtareaPrsntAddress").val("asdff");
	// 	$("#txtareaPrmntAddress").val("asdff");
	// 	$("#txtClassSought").val("asdff");
	// 	$("#txtEmergencyContactName").val("asdff");

	// 	$("#txtEmergencyContactRelation").val("asdff");
	// 	$("#txtEmergencyContactMobile").val("asdff");
	// 	// $("#ddlEmergencyTransport").val("asdff");
	// 	$("#txtPrevSchoolName").val("asdff");
	// 	$("#txtPrevSchoolPlace").val("asdff");
	// 	$("#txtPrevSchoolBoard").val("asdff");

	// 	$("#txtPrevSchoolPrincipalName").val("asdff");
	// 	$("#txtPrevLastClassAttended").val("asdff");
	// 	$("#txtPrevPassedPercentage").val("asdff");
	// 	$("#txtPrevSession").val("asdff");
	// 	$("#txtPrevMediumOfInstruction").val("asdff");

	// 	$("#txtFatherName").val("asdff");
	// 	$("#txtfatherHighestQual").val("asdff");
	// 	$("#txtfatherMobile").val("18274983");
	// 	$("#txtfatherEmerContactNo").val("asdff");
	// 	// $("#ddlfatherOccupation").val("asdff");
	// 	$("#txtfatherOrgName").val("asdff");
	// 	$("#txtfatherDesignation").val("asdff");
	// 	// $("#ddlfatherAnnualIncome").val("asdff");
	// 	$("#txtfatherOfficeAddress").val("asdff");
	// 	$("#txtfatherOfficeContactNo").val("873987631");


	// 	$("#txtMotherName").val("asdff");
	// 	$("#txtmotherHighestQual").val("asdff");
	// 	$("#txtmotherMobile").val("18274983");
	// 	$("#txtmotherEmerContactNo").val("asdff");
	// 	// $("#ddlOccupationmother").val("asdff");
	// 	$("#txtmotherOrgName").val("asdff");
	// 	$("#txmotherDesignation").val("asdff");
	// 	// $("#ddlAnnualIncomemother").val("asdff");
	// 	$("#txtmotherOfficeAddress").val("asdff");
	// 	$("#txtmotherOfficeContactNo").val("873987631");
	// }

	// formfill();
	$("#form").submit(function (e)
	{
		e.preventDefault();
	});

	$("#studentPhotoDiv").click(function (e)
	{
		$("#fileStudentPhoto").change(function ()
		{
			uploadFiles("fileStudentPhoto", 1);
		});
	});

	$("#fatherPhotoDiv").click(function (e)
	{
		$("#fileFatherPhoto").change(function ()
		{
			uploadFiles("fileFatherPhoto", 2);
		});
	});

	$("#motherPhotoDiv").click(function (e)
	{
		$("#fileMotherPhoto").change(function ()
		{
			uploadFiles("fileMotherPhoto", 3);
		});
	});

	// Upload father's sign
	$("#fileFatherSign").on("change", function ()
	{
		uploadFiles("fileFatherSign", 2.5);
	});

	// Upload Mother's sign
	$("#fileMotherSign").on("change", function ()
	{
		uploadFiles("fileMotherSign", 3.5);
	});



	function uploadFiles(Photo, source)
	{
		let PhotoVal = $(Photo).val();

		if (PhotoVal != "")
		{
			let file = document.getElementById(Photo).files[0];
			let formData = new FormData();
			let size = file.size;

			let fileName = file.name.split(".");
			let index = fileName.length;
			let format = fileName[index - 1];

			if (format != "jpeg" && format != "JPEG" && format != "jpg" && format != "JPG" && format != "png" && format != "PNG")
			{
				alert("Please upload a jpeg/jpg/png image!");

				PhotoVal.val("");
				return false;
			}

			if (size > 500 * 1024)
			{
				alert("The photo should be of 500KB max!");

				PhotoVal.val("");
				return false;
			}

			formData.append("file0", file);
			formData.append("schoolId", 1766695);

			$.ajax
				({
					url: "https://institution.vawsum.com/Cloudinary/uploadFile",
					type: "POST",
					data: formData,
					async: false,
					cache: false,
					contentType: false,
					enctype: "multipart/form-data",
					processData: false
				})
				.done(function (res)
				{
					var response = JSON.parse(res);

					if (response[0].isOk == true)
					{
						PhotoUrl = response[0].responseObject.secure_url;
						UrlName = Photo.substring(4) + "Url";

						if (source == 1)
						{
							studentPhotoUrl = PhotoUrl;

						}
						else if (source == 2)
						{
							fatherPhotoUrl = PhotoUrl;
						}
						else if (source == 3)
						{
							motherPhotoUrl = PhotoUrl;
						}
						else if (source == 2.5)
						{
							fatherSignUrl = PhotoUrl;
						}
						else if (source == 3.5)
						{
							motherSignUrl = PhotoUrl;
						}
					}
					else
					{
						alert("we are facing some difficulties. Please try again after sometime!");
					}
				});
		}
	}

	$("#btnSubmit").click(function ()
	{
		if ($("#txtStudentName").val() == "")
		{
			alert("Fill Up the Name");
			$("#txtStudentName").focus();
			return false;
		}

		if ($("#dateDOB").val() == "")
		{
			alert("Fill Date Of Birth");
			$("#dateDOB").focus();
			return false;
		}

		if ($("#ddlStudentSex").val() == "")
		{
			alert("Select the Sex");
			$("#ddlStudentSex").focus();
			return false;
		}

		if ($("#txtBloodgrp").val() == "")
		{
			alert("Fill the Bloodgroup");
			$("#txtBloodgrp").focus();
			return false;
		}

		if ($("#txtNationality").val() == "")
		{
			alert("Fill the Nationality");
			$("#txtNationality").focus();
			return false;
		}

		if ($("#txtReligion").val() == "")
		{
			alert("Fill the Religion");
			$("#txtReligion").focus();
			return false;
		}

		if ($("#ddlCategory").val() == "")
		{
			alert("Select the Category");
			$("#ddlCategory").focus();
			return false;
		}

		if ($("#txtMotherTongue").val() == "")
		{
			alert("Fill the Mother Tongue");
			$("#txtMotherTongue").focus();
			return false;
		}

		if ($("#ddlSingleParent").val() == "")
		{
			alert("Fill Up the Detail");
			$("#ddlSingleParent").focus();
			return false;
		}

		if ($("#ddlLegalGuardian").val() == "")
		{
			alert("Select the Detail");
			$("#ddlLegalGuardian").focus();
			return false;
		}
		if ($("#txtContactNo").val() == "")
		{
			alert("Fill Up the Contact No");
			$("#txtContactNo").focus();
			return false;
		}

		if ($("#txtMobile").val() == "")
		{
			alert("Fill Up the Mobile No");
			$("#txtMobile").focus();
			return false;
		}

		if ($("#txtareaPrsntAddress").val() == "")
		{
			alert("Fill Up the Present Address");
			$("#txtareaPrsntAddress").focus();
			return false;
		}

		if ($("#txtareaPrmntAddress").val() == "")
		{
			alert("Fill Up the Permanent Address");
			$("#txtareaPrmntAddress").focus();
			return false;
		}
		
		if ($("#fileStudentPhoto").val() == "")
		{
			alert("Select a Photo");
			$("#fileStudentPhoto").focus();
			return false;
		}

		if ($("#txtClassSought").val() == "")
		{
			alert("Fill up the Class Sought");
			$("#txtClassSought").focus();
			return false;
		}

		if ($("#ddlSecondLanguage").val() == "")
		{
			alert("Fill up the Detail");
			$("#ddlSecondLanguage").focus();
			return false;
		}

		if ($("#txtEmergencyContactName").val() == "")
		{
			alert("Fill up the Detail");
			$("#txtEmergencyContactName").focus();
			return false;
		}

		if ($("#txtEmergencyContactRelation").val() == "")
		{
			alert("Fill up the Detail");
			$("#txtEmergencyContactRelation").focus();
			return false;
		}

		if ($("#txtEmergencyContactMobile").val() == "")
		{
			alert("Fill up the Detail");
			$("#txtEmergencyContactMobile").focus();
			return false;
		}

		if ($("#ddlEmergencyTransport").val() == "")
		{
			alert("Fill up the Detail");
			$("#ddlEmergencyTransport").focus();
			return false;
		}
		if ($("#txtPrevSchoolName").val() == "")
		{
			alert("Fill Up the Name");
			$("#txtPrevSchoolName").focus();
			return false;
		}

		if ($("#txtPrevSchoolPlace").val() == "")
		{
			alert("Fill Up the Detail");
			$("#txtPrevSchoolPlace").focus();
			return false;
		}

		if ($("#txtPrevSchoolBoard").val() == "")
		{
			alert("Fill Up the Detail");
			$("#txtPrevSchoolBoard").focus();
			return false;
		}

		if ($("#txtPrevSchoolPrincipalName").val() == "")
		{
			alert("Fill Up the Detail");
			$("#txtPrevSchoolPrincipalName").focus();
			return false;
		}

		if ($("#txtPrevLastClassAttended").val() == "")
		{
			alert("Fill Up the Detail");
			$("#txtPrevLastClassAttended").focus();
			return false;
		}

		if ($("#txtPrevPassedPercentage").val() == "")
		{
			alert("Fill Up the Detail");
			$("#txtPrevPassedPercentage").focus();
			return false;
		}

		if ($("#txtPrevSession").val() == "")
		{
			alert("Fill Up the Detail");
			$("#txtPrevSession").focus();
			return false;
		}

		if ($("#txtPrevMediumOfInstruction").val() == "")
		{
			alert("Fill Up the Detail");
			$("#txtPrevMediumOfInstruction").focus();
			return false;
		}

		// Father Details

		if ($("#txtFatherName").val() == "")
		{
			alert("Fill Up Details");
			$("#txtFatherName").focus();
			return false;
		}

		if ($("#txtfatherHighestQual").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtfatherHighestQual").focus();
			return false;
		}
		if ($("#txtfatherMobile").val() == "")
		{
			alert("Fill Up Details");
			$("#txtfatherMobile").focus();
			return false;
		}

		if ($("#txtfatherEmerContactNo").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtfatherEmerContactNo").focus();
			return false;
		}
		if ($("#ddlfatherOccupation").val() == "")
		{
			alert("Fill Up Details");
			$("#ddlfatherOccupation").focus();
			return false;
		}

		if ($("#txtfatherOrgName").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtfatherOrgName").focus();
			return false;
		}
		if ($("#txtfatherDesignation").val() == "")
		{
			alert("Fill Up Details");
			$("#txtfatherDesignation").focus();
			return false;
		}

		if ($("#ddlfatherAnnualIncome").val() == "")
		{
			alert("Fill Up the Details");
			$("#ddlfatherAnnualIncome").focus();
			return false;
		}
		if ($("#txtfatherOfficeAddress").val() == "")
		{
			alert("Fill Up Details");
			$("#txtfatherOfficeAddress").focus();
			return false;
		}

		if ($("#txtfatherOfficeContactNo").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtfatherOfficeContactNo").focus();
			return false;
		}

		if ($("#fileFatherPhoto").val() == "")
		{
			alert("Fill Up Details");
			$("#fileFatherPhoto").focus();
			return false;
		}

		if ($("#fileFatherSign").val() == "")
		{
			alert("Select Father Signature");
			$("#fileFatherSign").focus();
			return false;
		}
		// Mother Details

		if ($("#txtMotherName").val() == "")
		{
			alert("Fill Up Details");
			$("#txtMotherName").focus();
			return false;
		}

		if ($("#txtmotherHighestQual").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtmotherHighestQual").focus();
			return false;
		}
		if ($("#txtmotherMobile").val() == "")
		{
			alert("Fill Up Details");
			$("#txtmotherMobile").focus();
			return false;
		}

		if ($("#txtmotherEmerContactNo").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtmotherEmerContactNo").focus();
			return false;
		}
		if ($("#ddlmotherOccupation").val() == "")
		{
			alert("Fill Up Details");
			$("#ddlmotherOccupation").focus();
			return false;
		}

		if ($("#txtmotherOrgName").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtmotherOrgName").focus();
			return false;
		}
		if ($("#txtmotherDesignation").val() == "")
		{
			alert("Fill Up Details");
			$("#txtmotherDesignation").focus();
			return false;
		}

		if ($("#ddlmotherAnnualIncome").val() == "")
		{
			alert("Fill Up the Details");
			$("#ddlmotherAnnualIncome").focus();
			return false;
		}
		if ($("#txtmotherOfficeAddress").val() == "")
		{
			alert("Fill Up Details");
			$("#txtmotherOfficeAddress").focus();
			return false;
		}

		if ($("#txtmotherOfficeContactNo").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtmotherOfficeContactNo").focus();
			return false;
		}

		if ($("#fileMotherPhoto").val() == "")
		{
			alert("Select a Photo");
			$("#fileMotherPhoto").focus();
			return false;
		}

		if ($("#fileMotherSign").val() == "")
		{
			alert("Select Mother Signature");
			$("#fileMotherSign").focus();
			return false;
		}

		// DECLARATIONS
		if ($("#txtdeclarationFather").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtdeclarationFather").focus();
			return false;
		}

		if ($("#txtdeclarationMother").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtdeclarationMother").focus();
			return false;
		}

		if ($("#txtdeclarationStudent").val() == "")
		{
			alert("Fill Up the Details");
			$("#txtdeclarationStudent").focus();
			return false;
		}

		var form = $("#form");
		if (form.valid() != true)
		{
			return false;
		}
		else
		{
			let name = $("#txtStudentName").val();
			let dob = $("#dateDOB").val();
			let studentSex = $("#ddlStudentSex").val();
			let bloodgroup = $("#txtBloodgroup").val();
			let nationality = $("#txtNationality").val();
			let religion = $("#txtReligion").val();
			let category = $("#ddlCategory").val();
			let motherTounge = $("#txtMotherTongue").val();
			let singleParent = $("#ddlSingleParent").val();
			let legalGuardian = $("#ddlLegalGuardian").val();
			let contactNo = $("#txtContactNo").val();
			let mobile = $("#txtMobile").val();
			let presentAddress = $("#txtareaPrsntAddress").val();
			let permanentAddress = $("#txtareaPrmntAddress").val();

			// Educational Details
			let classSought = $("#txtClassSought").val();
			let secondLanguage = $("#ddlSecondLanguage").val();
			let emergencyContactName = $("#txtEmergencyContactName").val();
			let emergencyContactRelation = $("#txtEmergencyContactRelation").val();
			let emergencyContactMobile = $("#txtEmergencyContactMobile").val();
			let emergencyTransport = $("#ddlEmergencyTransport").val();
			let prevSchoolName = $("#txtPrevSchoolName").val();
			let prevSchoolPlace = $("#txtPrevSchoolPlace").val();
			let prevSchoolBoard = $("#txtPrevSchoolBoard").val();
			let prevSchoolPrincipalName = $("#txtPrevSchoolPrincipalName").val();
			let prevLastClassAttended = $("#txtPrevLastClassAttended").val();
			let prevPassedPercentage = $("#txtPrevPassedPercentage").val();
			let prevSession = $("#txtPrevSession").val();
			let prevMediumOfInstruction = $("#txtPrevMediumOfInstruction").val();

			//Father Details 

			let fatherName = $("#txtFatherName").val();
			let fatherHighestQual = $("#txtfatherHighestQual").val();
			let fatherMobile = $("#txtfatherMobile").val();
			let fatherEmerContactNo = $("#txtfatherEmerContactNo").val();

			let fatherOccupation = $("#ddlfatherOccupation").val();
			let fatherOrgName = $("#txtfatherOrgName").val();
			let fatherDesignation = $("#txtfatherDesignation").val();
			let fatherAnnualIncome = $("#ddlfatherAnnualIncome").val();
			let fatherOfficeAddress = $("#txtfatherOfficeAddress").val();
			let fatherOfficeContactNo = $("#txtfatherOfficeContactNo").val();

			//Mother Details 

			let motherName = $("#txtMotherName").val();
			let motherHighestQual = $("#txtmotherHighestQual").val();
			let motherMobile = $("#txtmotherMobile").val();
			let motherEmerContactNo = $("#txtmotherEmerContactNo").val();

			let motherOccupation = $("#ddlmotherOccupation").val();
			let motherOrgName = $("#txtmotherOrgName").val();
			let motherDesignation = $("#txmotherDesignation").val();
			let motherAnnualIncome = $("#ddlmotherAnnualIncome").val();
			let motherOfficeAddress = $("#txtmotherOfficeAddress").val();
			let motherOfficeContactNo = $("#txtmotherOfficeContactNo").val();
			
			
			let sendEmailTo = "info@Greenfieldhabra.com";
			
			var applicationDetails = new Object();
			
			applicationDetails.name = name;
			applicationDetails.dob = dob;
			applicationDetails.studentSex = studentSex;
			applicationDetails.bloodgroup = bloodgroup;
			applicationDetails.nationality = nationality;
			applicationDetails.religion = religion;
			applicationDetails.category = category;
			applicationDetails.motherTounge = motherTounge;
			applicationDetails.singleParent = singleParent;
			applicationDetails.legalGuardian = legalGuardian;
			applicationDetails.contactNo = contactNo;
			applicationDetails.mobile = mobile;
			applicationDetails.permanentAddress = permanentAddress;
			applicationDetails.presentAddress = presentAddress;
			applicationDetails.studentPhotoUrl = studentPhotoUrl;
			
			applicationDetails.classSought = classSought;
			applicationDetails.secondLanguage = secondLanguage;
			applicationDetails.emergencyContactName = emergencyContactName;
			applicationDetails.emergencyContactRelation = emergencyContactRelation;
			applicationDetails.emergencyContactMobile = emergencyContactMobile;
			applicationDetails.emergencyTransport = emergencyTransport;
			applicationDetails.prevSchoolName = prevSchoolName;
			applicationDetails.prevSchoolPlace = prevSchoolPlace;
			applicationDetails.prevSchoolBoard = prevSchoolBoard;
			applicationDetails.prevSchoolPrincipalName = prevSchoolPrincipalName;
			applicationDetails.prevLastClassAttended = prevLastClassAttended;
			applicationDetails.prevPassedPercentage = prevPassedPercentage;
			applicationDetails.prevSession = prevSession;
			applicationDetails.prevMediumOfInstruction = prevMediumOfInstruction;

			applicationDetails.fatherName = fatherName;
			applicationDetails.fatherHighestQual = fatherHighestQual;
			applicationDetails.fatherMobile = fatherMobile;
			applicationDetails.fatherEmerContactNo = fatherEmerContactNo;
			applicationDetails.fatherOccupation = fatherOccupation;
			applicationDetails.fatherOrgName = fatherOrgName;
			applicationDetails.fatherDesignation = fatherDesignation;
			applicationDetails.fatherAnnualIncome = fatherAnnualIncome;
			applicationDetails.fatherOfficeAddress = fatherOfficeAddress;
			applicationDetails.fatherOfficeContactNo = fatherOfficeContactNo;
			applicationDetails.fatherPhotoUrl = fatherPhotoUrl;
			applicationDetails.fatherSignUrl = fatherSignUrl;

			applicationDetails.motherName = motherName;
			applicationDetails.motherHighestQual = motherHighestQual;
			applicationDetails.motherMobile = motherMobile;
			applicationDetails.motherEmerContactNo = motherEmerContactNo;
			applicationDetails.motherOccupation = motherOccupation;
			applicationDetails.motherOrgName = motherOrgName;
			applicationDetails.motherDesignation = motherDesignation;
			applicationDetails.motherAnnualIncome = motherAnnualIncome;
			applicationDetails.motherOfficeAddress = motherOfficeAddress;
			applicationDetails.motherOfficeContactNo = motherOfficeContactNo;
			applicationDetails.motherPhotoUrl = motherPhotoUrl;
			applicationDetails.motherSignUrl = motherSignUrl;

			applicationDetails.sendEmailTo = sendEmailTo;

			let jsonString = JSON.stringify(applicationDetails);

			$.ajax
			({
				// url: "http://vawsum/TempForms/saveUserDataGreenfieldConventHabra",
				url: "https://institution.vawsum.com/TempForms/saveUserDataGreenfieldConventHabra",
				type: "POST",
				data: jsonString
			})
			.done(function (res)
			{
				var response = JSON.parse(res);
				var formId = response["formId"];

				var Base64 = (function make_b64() { var map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; return { encode: function (input/*:string*/)/*:string*/ { var o = ""; var c1 = 0, c2 = 0, c3 = 0, e1 = 0, e2 = 0, e3 = 0, e4 = 0; for (var i = 0; i < input.length;) { c1 = input.charCodeAt(i++); e1 = (c1 >> 2); c2 = input.charCodeAt(i++); e2 = ((c1 & 3) << 4) | (c2 >> 4); c3 = input.charCodeAt(i++); e3 = ((c2 & 15) << 2) | (c3 >> 6); e4 = (c3 & 63); if (isNaN(c2)) { e3 = e4 = 64; } else if (isNaN(c3)) { e4 = 64; } o += map.charAt(e1) + map.charAt(e2) + map.charAt(e3) + map.charAt(e4); } return o; }, decode: function b64_decode(input/*:string*/)/*:string*/ { var o = ""; var c1 = 0, c2 = 0, c3 = 0, e1 = 0, e2 = 0, e3 = 0, e4 = 0; input = input.replace(/[^\w\+\/\=]/g, ""); for (var i = 0; i < input.length;) { e1 = map.indexOf(input.charAt(i++)); e2 = map.indexOf(input.charAt(i++)); c1 = (e1 << 2) | (e2 >> 4); o += String.fromCharCode(c1); e3 = map.indexOf(input.charAt(i++)); c2 = ((e2 & 15) << 4) | (e3 >> 2); if (e3 !== 64) { o += String.fromCharCode(c2); } e4 = map.indexOf(input.charAt(i++)); c3 = ((e3 & 3) << 6) | e4; if (e4 !== 64) { o += String.fromCharCode(c3); } } return o; } }; })();
				var string = `${formId}`;
				encodedString = Base64.encode(string);
				
				if (response.isOk == true)
				{
					previewUrl = `https://www.greenfieldhabra.com/form-preview.html?=${encodedString}`

					// Ajax call for sending data for email

					// url2 = `http://vawsum/Websites/sendContactEnquiryCpsBalangir/${encodedString}`;
					url2 = `https://institution.vawsum.com/Websites/sendContactEnquiryGreenfieldConventHabra/${encodedString}`;
					$.ajax
						({
							url: url2,
							type: "POST",
							data: jsonString,
						})
						.done(function (res2)
						{
							var resp2 = JSON.parse(res2);

							alert("Your form has been saved successfully. Click OK to download your copy of the form submitted ");
						});
						window.open(previewUrl, "_self");

					// alert("Data Stored Successfully");
				}
				else
				{
					alert("We are facing some difficulties. Please try again later!")
				}
			});

		}
	});
});