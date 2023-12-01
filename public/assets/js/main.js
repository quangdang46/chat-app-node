$(document).ready(function () {
  // init userchat
  $(".user-chat").hide();

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
        // setTimeout(() => {
        //   window.location.href = "/home";
        // }, 1000);
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
});
