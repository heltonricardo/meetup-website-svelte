<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let imageUrl = "";
  let email = "";
  let description = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Lear to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code!",
      imageUrl:
        "https://www.enap.gov.br/media_files/images/imagem_bootcamp.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
      isFavorite: false,
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "Wee will simply swim some rounds!",
      imageUrl: "https://pbs.twimg.com/media/Cx9mroxWIAIHHJP.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "swim@test.com",
      isFavorite: false,
    },
  ];

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      contactEmail: email,
      title,
      subtitle,
      imageUrl,
      description,
      address,
    };

    meetups = [newMeetup, ...meetups];
  }

  function toggleFavorite(event) {
    meetups = meetups.map((meetup) =>
      meetup.id === event.detail
        ? { ...meetup, isFavorite: !meetup.isFavorite }
        : meetup
    );

    // Modo verboso:
    // const id = event.detail;
    // const updatedMeetup = { ...meetups.find((m) => m.id === id) };
    // updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    // const meetupIndex = meetups.findIndex((m) => m.id === id);
    // const updatedMeetups = [...meetups];
    // updatedMeetups[meetupIndex] = updatedMeetup;
    // meetups = updatedMeetups;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />
<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={(event) => (title = event.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={(event) => (subtitle = event.target.value)}
    />
    <TextInput
      id="address"
      label="address"
      value={address}
      on:input={(event) => (address = event.target.value)}
    />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      on:input={(event) => (imageUrl = event.target.value)}
    />
    <TextInput
      id="email"
      label="E-mail"
      type="email"
      value={email}
      on:input={(event) => (email = event.target.value)}
    />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      value={description}
      on:input={(event) => (description = event.target.value)}
    />
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} on:toggleFavorite={toggleFavorite} />
</main>
