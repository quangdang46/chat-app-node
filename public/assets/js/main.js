$(document).ready(function () {
  // init userchat
  $(".user-chat").hide();
  $(".group-chat").hide();

  $("#registerForm").submit(function (e) {
    e.preventDefault();
    var fullname = $("#fullname").val();
    var username = $("#username").val();
    var password = $("#password").val();
    console.log({ fullname, username, password });

    $.ajax({
      type: "POST",
      url: "/register",
      dataType: "json",
      data: { fullname, username, password },
      success: function (response) {
        $.toast({
          heading: "Success",
          text: response.message,
          showHideTransition: "slide",
          icon: "success",
          position: "top-right",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  $("#loginForm").submit(function (e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({
      type: "POST",
      url: "/login",
      dataType: "json",
      data: { username, password },
      success: function (response) {
        $.toast({
          heading: "Success",
          text: response.message,
          showHideTransition: "slide",
          icon: "success",
          position: "top-right",
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  ////////////////////////////////////////////////////////////////////////
  const socket = io("/chat", {
    auth: {
      token: $(".idUser").val(),
    },
  });

  // client-send-status-online
  socket.on("client-send-status-online", (userId) => {
    $(`#status-${userId}`).removeClass("offline");
    $(`#status-${userId}`).addClass("online");
  });

  // client-send-status-offline
  socket.on("client-send-status-offline", (userId) => {
    $(`#status-${userId}`).removeClass("online");
    $(`#status-${userId}`).addClass("offline");
  });

  // event click group user

  // template profile receive
  const templateProfileReceive = (user) => {
    return `
      <div class="">
          <div class="text-center p-4 border-bottom">
            <div class="mb-4">
              <img
                src="images/${user.image}"
                class="rounded-circle avatar-lg img-thumbnail"
                alt=""
              />
            </div>

            <h5 class="font-size-16 mb-1 text-truncate">${user.fullname}</h5>
          </div>

          <div class="p-4 user-profile-desc" data-simplebar>

            <div class="accordion" id="myprofile">

              <div class="accordion-item card border mb-2">
                <div class="accordion-header" id="about3">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#aboutprofile"
                    aria-expanded="true"
                    aria-controls="aboutprofile"
                  >
                    <h5 class="font-size-14 m-0">
                      <i
                        class="fa-solid fa-user me-2 ms-0 align-middle d-inline-block"
                      ></i>
                      About
                    </h5>
                  </button>
                </div>
                <div
                  id="aboutprofile"
                  class="accordion-collapse collapse show"
                  aria-labelledby="about3"
                  data-bs-parent="#myprofile"
                >
                  <div class="accordion-body">
                    <div>
                      <p class="text-muted mb-1">Name</p>
                      <h5 class="font-size-14">${user.fullname}</h5>
                    </div>

                    <div class="mt-4">
                      <p class="text-muted mb-1">Time</p>
                      <h5 class="font-size-14">${user.updatedAt}</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div class="accordion-item card border">
                <div class="accordion-header" id="attachfile3">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#attachprofile"
                    aria-expanded="false"
                    aria-controls="attachprofile"
                  >
                    <h5 class="font-size-14 m-0">
                      <i
                        class="fa-solid fa-file me-2 ms-0 align-middle d-inline-block"
                      ></i>
                      Attached Files
                    </h5>
                  </button>
                </div>
                <div
                  id="attachprofile"
                  class="accordion-collapse collapse"
                  aria-labelledby="attachfile3"
                  data-bs-parent="#myprofile"
                >
                  <div class="accordion-body">
                    <div class="card p-2 border mb-2">
                      <div class="d-flex align-items-center">
                        <div class="avatar-sm me-3 ms-0">
                          <div
                            class="avatar-title bg-primary-subtle text-primary rounded font-size-20"
                          >
                            <i class="ri-file-text-fill"></i>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <div class="text-start">
                            <h5 class="font-size-14 mb-1">admin_v1.0.zip</h5>
                            <p class="text-muted font-size-13 mb-0">12.5 MB</p>
                          </div>
                        </div>

                        <div class="ms-4 me-0">
                          <ul class="list-inline mb-0 font-size-18">
                            <li class="list-inline-item">
                              <a href="#" class="text-muted px-1">
                                <i class="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li class="list-inline-item dropdown">
                              <a
                                class="dropdown-toggle text-muted px-1"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i class="ri-more-fill"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Delete</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="card p-2 border mb-2">
                      <div class="d-flex align-items-center">
                        <div class="avatar-sm me-3 ms-0">
                          <div
                            class="avatar-title bg-primary-subtle text-primary rounded font-size-20"
                          >
                            <i class="ri-image-fill"></i>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <div class="text-start">
                            <h5 class="font-size-14 mb-1">Image-1.jpg</h5>
                            <p class="text-muted font-size-13 mb-0">4.2 MB</p>
                          </div>
                        </div>

                        <div class="ms-4 me-0">
                          <ul class="list-inline mb-0 font-size-18">
                            <li class="list-inline-item">
                              <a href="#" class="text-muted px-1">
                                <i class="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li class="list-inline-item dropdown">
                              <a
                                class="dropdown-toggle text-muted px-1"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i class="ri-more-fill"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Delete</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="card p-2 border mb-2">
                      <div class="d-flex align-items-center">
                        <div class="avatar-sm me-3 ms-0">
                          <div
                            class="avatar-title bg-primary-subtle text-primary rounded font-size-20"
                          >
                            <i class="ri-image-fill"></i>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <div class="text-start">
                            <h5 class="font-size-14 mb-1">Image-2.jpg</h5>
                            <p class="text-muted font-size-13 mb-0">3.1 MB</p>
                          </div>
                        </div>

                        <div class="ms-4 me-0">
                          <ul class="list-inline mb-0 font-size-18">
                            <li class="list-inline-item">
                              <a href="#" class="text-muted px-1">
                                <i class="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li class="list-inline-item dropdown">
                              <a
                                class="dropdown-toggle text-muted px-1"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i class="ri-more-fill"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Delete</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="card p-2 border mb-2">
                      <div class="d-flex align-items-center">
                        <div class="avatar-sm me-3 ms-0">
                          <div
                            class="avatar-title bg-primary-subtle text-primary rounded font-size-20"
                          >
                            <i class="ri-file-text-fill"></i>
                          </div>
                        </div>
                        <div class="flex-grow-1">
                          <div class="text-start">
                            <h5 class="font-size-14 mb-1">Landing-A.zip</h5>
                            <p class="text-muted font-size-13 mb-0">6.7 MB</p>
                          </div>
                        </div>

                        <div class="ms-4 me-0">
                          <ul class="list-inline mb-0 font-size-18">
                            <li class="list-inline-item">
                              <a href="#" class="text-muted px-1">
                                <i class="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li class="list-inline-item dropdown">
                              <a
                                class="dropdown-toggle text-muted px-1"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i class="ri-more-fill"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Delete</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
    `;
  };

  const profileReceive = (user) => {
    return `
    <div class="d-flex align-items-center">
                  <div class="d-block d-lg-none me-2 ms-0">
                    <a
                      href="javascript: void(0);"
                      class="user-chat-remove text-muted font-size-16 p-2"
                    ><i class="ri-arrow-left-s-line"></i></a>
                  </div>
                  <div class="me-3 ms-0">
                    <img
                      src="images/${user.image}"
                      class="rounded-circle avatar-xs"
                      alt=""
                    />
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <h5 class="font-size-16 mb-0 text-truncate"><a
                        href="#"
                        class="text-reset user-profile-show"
                      >${user.fullname}</a>
                      <i
                        class="fa-solid fa-circle font-size-10 ${
                          user.online ? " text-success " : " text-danger "
                        } d-inline-block ms-1"
                      ></i>
                    </h5>
                  </div>
                </div>
    `;
  };

  $(".list-group-users").click(function (e) {
    $(".user-chat").show(1000);
    $(".group-chat").hide();

    const userId = $(this).attr("data-id");
    $(".idReceiver").val(userId);
    // show infonation receive
    $.ajax({
      type: "POST",
      url: "/getprofile",
      dataType: "json",
      data: { idUserReceive: userId },
      success: function (response) {
        $(".container-user-profile").html(
          templateProfileReceive(response.userReceive)
        );
        $(".profile-receive").html(profileReceive(response.userReceive));
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });

    // emit old chat
    const idUser = $(".idUser").val();
    socket.emit("client-send-id-send-receive", {
      sender: idUser,
      receiver: userId,
    });
  });

  const templateChat = ({ user, message, is_sender, time, chatId = "" }) => {
    return `<li class="${!is_sender && "right"}" data-idChat="${chatId}">
              <div class="conversation-list">
                <div class="chat-avatar">
                  <img src="images/${user.image}" alt="" />
                </div>

                <div class="user-chat-content">
                  <div class="ctext-wrap">
                    <div class="ctext-wrap-content">
                      <p class="mb-0 message-data">
                        ${message}
                      </p>
                      <p class="chat-time mb-0">
                        <i class="fa-solid fa-clock align-middle"></i>
                        <span class="align-middle">${time}</span></p>
                    </div>
                    ${
                      is_sender
                        ? `<div class="dropdown align-self-start">
                      <a
                        class="dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <div class="dropdown-menu">
                        <a type="button" class="dropdown-item button-delete-chat" data-bs-toggle="modal" data-bs-target="#deleteModal" style="
                              display: flex;
                              align-items: center;
                              justify-content: space-around;
                          " data-idChat="${chatId}">Delete
                          <i class="fa-solid fa-trash-can float-end text-muted" style="pointer-event :none"></i>
                          </a>
                        <a type="button" class="dropdown-item button-edit-chat" data-bs-toggle="modal" data-bs-target="#editModal" style="
                              display: flex;
                              align-items: center;
                              justify-content: space-around;
                          " data-idChat="${chatId}">Edit 
                          <i class="fa-solid fa-pen-to-square float-end text-muted" style="pointer-event :none"></i>
                          </a>
                      </div>
                    </div>`
                        : ""
                    }
                    
                  </div>
                  <div class="conversation-name">${user.fullname}</div>
                </div>
              </div>
            </li>`;
  };

  // send chat
  $(".chat-input-section").submit(function (e) {
    e.preventDefault();
    const message = $(".chat-input").val();
    const idUserReceiver = $(".idReceiver").val();
    const idSender = $(".idUser").val();

    $.ajax({
      type: "POST",
      url: "/save-message",
      dataType: "json",
      data: { message, sender: idSender, receiver: idUserReceiver },
      success: function (response) {
        $(".chat-input").val("");
        const chat = response.newChat;
        console.log(chat);
        const is_sender = chat.sender._id == $(".idUser").val();
        $(".chat-user-container").append(
          templateChat({
            user: is_sender ? chat.sender : chat.receiver,
            message: chat.message,
            is_sender,
            time: formatTime(chat.createdAt),
            chatId: chat._id,
          })
        );

        // emit new chat
        socket.emit("client-send-message", chat);
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  $(".chat-input").val("");

  // server-load-new-chat
  socket.on("server-load-new-chat", (chat) => {
    const idSender = $(".idUser").val();
    const idReceiver = $(".idReceiver").val();

    const { sender, receiver } = chat;
    if (idSender === receiver._id && idReceiver === sender._id) {
      $(".chat-user-container").append(
        templateChat({
          user: sender,
          message: chat.message,
          is_sender: false,
          time: formatTime(chat.createdAt),
          chatId: chat._id,
        })
      );
    }
  });

  // old chat
  // server-send-old-chat

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  socket.on("server-send-old-chat", (chats) => {
    let template = "";
    chats.forEach((chat) => {
      const is_sender = chat.sender._id == $(".idUser").val();
      template += templateChat({
        user: is_sender ? chat.sender : chat.receiver,
        message: chat.message,
        is_sender,
        time: formatTime(chat.createdAt),
        chatId: chat._id,
      });
    });
    $(".chat-user-container").html(template);
  });

  $(document).on("click", ".button-delete-chat", function (e) {
    e.preventDefault();
    const idChat = $(this).attr("data-idChat");
    $(".idChatDelete").val(idChat);
  });
  $(".btn-delete-chat").click(function (e) {
    e.preventDefault();
    const idChat = $(".idChatDelete").val();
    $.ajax({
      type: "POST",
      url: "/delete-message",
      dataType: "json",
      data: { idChat },
      success: function (response) {
        $(`li[data-idChat=${idChat}]`).remove();
        $("#deleteModal").modal("hide");

        $.toast({
          heading: "Success",
          text: response.message,
          showHideTransition: "slide",
          icon: "success",
          position: "top-right",
        });

        // emit delete chat
        socket.emit("client-delete-chat", idChat);
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  // server-delete-chat
  socket.on("server-delete-chat", (idChat) => {
    $(`li[data-idChat=${idChat}]`).remove();
  });

  // edit chat
  $(document).on("click", ".button-edit-chat", function (e) {
    e.preventDefault();
    const idChat = $(this).attr("data-idChat");
    $(".idChatEdit").val(idChat);

    const message = $(`li[data-idChat=${idChat}] .message-data`).text();
    $(".msg-edit").val(message.trim());
  });

  $(".btn-edit-chat").click(function (e) {
    e.preventDefault();
    const idChat = $(".idChatEdit").val();
    const message = $(".msg-edit").val();
    $.ajax({
      type: "POST",
      url: "/update-message",
      dataType: "json",
      data: { idChat, message },
      success: function (response) {
        $(`li[data-idChat=${idChat}] .message-data`).text(message);
        $("#editModal").modal("hide");

        $.toast({
          heading: "Success",
          text: response.message,
          showHideTransition: "slide",
          icon: "success",
          position: "top-right",
        });

        // emit edit chat
        socket.emit("client-edit-chat", { idChat, message });
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  // server-edit-chat
  socket.on("server-edit-chat", ({ idChat, message }) => {
    $(`li[data-idChat=${idChat}] .message-data`).text(message);
  });

  const templateGroup = (group) => {
    return `<li data-id-group="${group._id}">
                    <div class="d-flex align-items-center">
                      <div class="chat-user-img me-3 ms-0">
                        <div class="avatar-xs">

                          <img
                            src="/images/${group.image}"
                            alt="${group.name}}"
                            class="avatar-title rounded-circle"
                          />
                        </div>
                      </div>
                      <div class="flex-grow-1 overflow-hidden">
                        <h5
                          class="text-truncate font-size-14 mb-0"
                        >#${group.name}</h5>
                      </div>
                      <div class="dropdown">
                        <a
                          href="#"
                          class="text-muted dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" style="">
                          <a type="button" class="dropdown-item button-copy-group"
                            style="display: flex; align-items: center; justify-content: space-around" data-id="{{this._id}}"
                            >Copy 
                            <i class="fa-solid fa-copy float-end text-muted" style="pointer-event: none"></i>
                          </a>  
                        <a
                            type="button"
                            class="dropdown-item button-delete-group"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteGroup"
                            style="display: flex; align-items: center; justify-content: space-around"
                            data-id="${group._id}}" data-limit="${group.limit}}"
                          >Delete 
                            <i
                              class="fa-solid fa-trash-can float-end text-muted"
                              style="pointer-event: none"
                            ></i>
                          </a>
                          <a
                            type="button"
                            class="dropdown-item button-edit-group"
                            data-bs-toggle="modal"
                            data-bs-target="#updateGroup"
                            style="display: flex; align-items: center; justify-content: space-around"
                            data-id="{{this._id}}"
                            data-limit="{{this.limit}}"
                            data-name="{{this.name}}"
                          >Update
                            <i
                              class="fa-solid fa-pen-to-square float-end text-muted"
                              style="pointer-event: none"
                            ></i>
                          </a>
                          <a
                            type="button"
                            class="dropdown-item button-add-member"
                            data-bs-toggle="modal"
                            data-bs-target="#addMember"
                            style="display: flex; align-items: center; justify-content: space-around"
                            data-id="${group._id}}" data-limit="${group.limit}}"
                          >Add 
                            <i
                              class="fa-solid fa-pen-to-square float-end text-muted"
                              style="pointer-event: none"
                            ></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>`;
  };

  // group chat!!!!!!!!!!!!!!!!
  $("#form-group").submit(function (e) {
    e.preventDefault();
    const name = $(".name-group").val();
    const limit = $(".limit-group").val();
    const image = $("#imageGroup")[0].files[0];
    const idUser = $(".idUser").val();

    console.log(image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("limit", limit);
    formData.append("imageGroup", image);
    formData.append("idUser", idUser);

    $.ajax({
      type: "POST",
      url: "/group",
      data: formData,
      contentType: false, // Set contentType to false
      processData: false, // Set processData to false
      success: function (response) {
        $.toast({
          heading: "Success",
          text: response.message,
          showHideTransition: "slide",
          icon: "success",
          position: "top-right",
        });
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
        $("#addgroup-exampleModal").modal("hide");

        // add group to list group
        const newGroup = response.newGroup;
        $(".list-group-chat").append(templateGroup(newGroup));
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  // add member to group

  const templateMemberSelect = (member, isMember) => {
    return ` <li>
                                  <div class="form-check">
                                    <input
                                      type="checkbox"
                                      class="form-check-input"
                                      id="${member._id}"
                                      value="${member._id}"
                                      name="members"
                                      ${isMember ? "checked" : ""}
                                    />
                                    <label
                                      class="form-check-label"
                                      for="${member._id}"
                                    >${member.fullname}</label>
                                  </div>
                                </li>`;
  };

  $(document).on("click", ".button-add-member", function (e) {
    e.preventDefault();
    const idGroup = $(this).attr("data-id");
    const limit = $(this).attr("data-limit");
    $(".idGroup").val(idGroup);
    $(".limitMember").val(limit);

    $.ajax({
      type: "POST",
      url: "/get-member",
      dataType: "json",
      data: { idGroup },
      success: function (response) {
        let template = "";
        response.users.forEach((user) => {
          const isMember = user.member.length > 0;
          template += templateMemberSelect(user, isMember);
        });
        $(".select-members").html(template);
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  // add member to group

  $(".addMemberForm").submit(function (e) {
    e.preventDefault();

    const idGroup = $(".idGroup").val();
    const limit = $(".limitMember").val();

    const formData = $(this).serializeArray();
    const members = formData.map((member) => member.value);

    $.ajax({
      type: "POST",
      url: "/add-members",
      dataType: "json",
      data: { idGroup, members, limit },
      success: function (response) {
        if (response.success) {
          $.toast({
            heading: "Success",
            text: response.message,
            showHideTransition: "slide",
            icon: "success",
            position: "top-right",
          });
          console.log(response.group);
          // client emit add member
          socket.emit("client-send-add-member", {
            group: response.group,
            members: response.members,
          });
        } else {
          $.toast({
            heading: "Error",
            text: response.message,
            showHideTransition: "fade",
            icon: "error",
            position: "top-right",
          });
        }
        $("#addMember").modal("hide");
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
        $(".select-members").html("");
      },
    });
  });

  // server-send-add-member
  socket.on("server-send-add-member", (data) => {
    const currentUser = $(".idUser").val();
    const { members, group } = data;
    const isMember = members.some((member) => member._id == currentUser);
    console.log(isMember);
    if (isMember) {
      $(`.list-group-chat`).append(templateGroup(group));
    }
  });

  $(document).on("click", ".button-edit-group", function (e) {
    e.preventDefault();
    const idGroup = $(this).attr("data-id");
    const lastLimit = $(this).attr("data-limit");
    const name = $(this).attr("data-name");
    $(".idGroupUpdate").val(idGroup);
    $(".limitMemberUpdate").val(lastLimit);

    $(".name-group-update").val(name);
    $(".limit-group-update").val(lastLimit);
  });

  $("#form-group-update").submit(function (e) {
    e.preventDefault();
    const idGroup = $(".idGroupUpdate").val();
    const lastLimit = $(".limitMemberUpdate").val();
    const name = $(".name-group-update").val();
    const limit = $(".limit-group-update").val();
    const image = $("#imageGroupUpdate")[0].files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("limit", limit);
    formData.append("imageGroupUpdate", image);
    formData.append("idGroup", idGroup);
    formData.append("lastLimit", lastLimit);

    $.ajax({
      type: "POST",
      url: "/update-group",
      data: formData,
      contentType: false, // Set contentType to false
      processData: false, // Set processData to false
      success: function (response) {
        if (response.success) {
          $.toast({
            heading: "Success",
            text: response.message,
            showHideTransition: "slide",
            icon: "success",
            position: "top-right",
          });

          // add group to list group
          const newGroup = response.newGroup;
          console.log(newGroup);
          $(`li[data-id-group=${idGroup}]`).replaceWith(
            templateGroup(newGroup)
          );

          $("#updateGroup").modal("hide");
          setTimeout(() => {
            window.location.href = "/home";
          }, 1000);
        }
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  $(document).on("click", ".button-delete-group", function (e) {
    e.preventDefault();
    const idGroup = $(this).attr("data-id");
    $(".idGroupDelete").val(idGroup);
  });

  $(".btn-delete-group").click(function (e) {
    e.preventDefault();
    const idGroup = $(".idGroupDelete").val();
    $.ajax({
      type: "POST",
      url: "/delete-group",
      dataType: "json",
      data: { idGroup },
      success: function (response) {
        if (response.success) {
          $(`li[data-id-group=${idGroup}]`).remove();
          $("#deleteGroup").modal("hide");

          $.toast({
            heading: "Success",
            text: response.message,
            showHideTransition: "slide",
            icon: "success",
            position: "top-right",
          });
        } else {
          $.toast({
            heading: "Error",
            text: response.message,
            showHideTransition: "fade",
            icon: "error",
            position: "top-right",
          });
        }
      },
      error: function (error) {
        $.toast({
          heading: "Error",
          text: error.responseJSON.message,
          showHideTransition: "fade",
          icon: "error",
          position: "top-right",
        });
      },
    });
  });

  // copy link group
  $(document).on("click", ".button-copy-group", function (e) {
    e.preventDefault();
    const idGroup = $(this).attr("data-id");
    $.toast({
      heading: "Success",
      text: `Copy id group ${idGroup} success!`,
      showHideTransition: "slide",
      icon: "success",
      position: "top-right",
    });

    let temp = $("<input>");
    $("body").append(temp);
    temp.val(idGroup).select();
    document.execCommand("copy");
    temp.remove();
  });

  const themeSearchGroup = (data) => {
    const { group, isJoiner, isOwner, totalMember, avilable } = data;
    return `<li data-id-group="">
            <div class="d-flex align-items-center justify-content-center flex-column ">
              <div class="rounded-2 p-1 overflow-hidden" style="width: 100%;height: 200px">
                <img src="/images/${
                  group.image
                }" alt="" class="w-100 h-100 overflow-hidden rounded-2">
              </div>
              <h2>${group.name}</h2>
              <h5>Total ${totalMember} members</h5>
              ${
                avilable !== 0
                  ? `<h5>Aviable ${avilable} members</h5>`
                  : `<h5>Your group full</h5>`
              }
              ${
                isOwner
                  ? `<h5>You are owner,so can't join group</h5>`
                  : isJoiner != 0
                  ? `<h5>You are joiner,so can't join group</h5>`
                  : `<button type="button" class="btn btn-primary btn-sm button-join-group" value="${group._id}">Join Now</button>`
              }
            </div>

          </li>`;
  };

  $(".input-search-group").keyup(function (e) {
    var idGroup = $(this).val();
    $.ajax({
      type: "POST",
      url: "/search-group",
      dataType: "json",
      data: { id: idGroup },
      success: function (response) {
        // let template = "";
        // response.groups.forEach((group) => {
        //   template += templateGroup(group);
        // });
        // $(".list-group-chat").html(template);
        if (response.success) {
          $.toast({
            heading: "Success",
            text: "Search group success!",
            showHideTransition: "slide",
            icon: "success",
            position: "top-right",
          });
          $(".list-search-group").html(themeSearchGroup(response));
        } else {
          $.toast({
            heading: "Error",
            text: "Search group error!",
            showHideTransition: "fade",
            icon: "error",
            position: "top-right",
          });
        }
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  $(document).on("click", ".button-join-group", function (e) {
    e.preventDefault();
    const idGroup = $(this).val();
    $(this).text("Wai.....");
    $(this).attr("disabled", "disabled");

    $.ajax({
      type: "POST",
      url: "/join-group",
      dataType: "json",
      data: { group_id: idGroup },
      success: function (response) {
        if (response.success) {
          $.toast({
            heading: "Success",
            text: response.message,
            showHideTransition: "slide",
            icon: "success",
            position: "top-right",
          });
          location.reload();
        } else {
          $.toast({
            heading: "Error",
            text: response.message,
            showHideTransition: "fade",
            icon: "error",
            position: "top-right",
          });
          $(this).text("Join Now");
          $(this).removeAttr("disabled");
        }
        console.log(response);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  const groupProfile = (group) => {
    return `
    <div class="d-flex align-items-center">
                  <div class="d-block d-lg-none me-2 ms-0">
                    <a
                      href="javascript: void(0);"
                      class="user-chat-remove text-muted font-size-16 p-2"
                    ><i class="ri-arrow-left-s-line"></i></a>
                  </div>
                  <div class="me-3 ms-0">
                    <img
                      src="images/${group.image}"
                      class="rounded-circle avatar-xs"
                      alt=""
                    />
                  </div>
                  <div class="flex-grow-1 overflow-hidden">
                    <h5 class="font-size-16 mb-0 text-truncate"><a
                        href="#"
                        class="text-reset user-profile-show"
                      >${group.name}</a>
                      
                    </h5>
                  </div>
                </div>
    `;
  };

  $(".group-join").click(function (e) {
    $(".group-chat").show(1000);
    $(".user-chat").hide();
    const idGroup = $(this).attr("data-id-group");
    console.log("idGroup", idGroup);
    $.ajax({
      type: "POST",
      url: "/get-group",
      dataType: "json",
      data: { idGroup },
      success: function (response) {
        if (response.success) {
          console.log(response.group);
          $(".profile-group-chat").html(groupProfile(response.group));
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
