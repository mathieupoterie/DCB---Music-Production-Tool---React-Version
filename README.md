<h1 align="center">DCB - Music Production Tool</h1>

<h4 align="center">
  Final project at SPICED ACADEMY
</h4>

***

![http://i.imgur.com/07AhT63.png](http://i.imgur.com/07AhT63.png)

<!-- MarkdownTOC depth=3 autolink=true bracket=round -->


- [Synopsis](#synopsis)
- [Basic Concepts](#basic-concepts)
- [Instruments](#instruments)
- [Effects](#effects)
  - [Effect Busses](#effect-busses)
- [LFO](#lfo)
- [API](#api)
  - [Top Level](#top-level)
  - [Intruments](#intruments)
  - [Effects](#effects-1)
  - [Special](#special)
- [Known Issues & Roadmap](#known-issues--roadmap)
- [License](#license)

<!-- /MarkdownTOC -->


## Synopsis
I created this website during the last week of my SPICED Academy bootcamp, Berlin, in June 2017 ending.
I wanted to create a music instrument online, a bit different from what already exist. I used the idea of the sequencer to synchronise 3 instruments together :
    - Drums : this drums sequencer is pretty classical, and easy to use. Just click on the sound and step you want on the table, and you will have some sound ! Just play with it and after few seconds, you will get the concept !
    - Chords : the more challenging part of the project ! I had to use my music theorical knowledge to make it work. Based on the scale and root note you selected (ex : A minor), you can use this sequencer to play chords that will fit to those settings. You can choose between seven differents chords, each one can add a different feeling and emotion to your composition.
    - Bass : this bass sequencer is quite simple, but you can obtain very rich sounds using the saw, glide parameters.

The first section, 'Generic Settings', contains the most important settings of your songs (tempo, root, scale), and also effects that you will apply to the three instruments (delay, reverb, filter, bitcrusher).
Each of those instruments have different effects you can experiment. The Visualiser is a bonus feature to help you see your sound specter, from the lowest frequencies, on the left to the highest on the right.

I worked in this project using "react music" (https://github.com/FormidableLabs/react-music). Here is, from their documentation, the react component I used to create this DCB Instrument.

## Basic Concepts I used from "React-Music" by FormidableLabs

#### Song

The first thing you want to do is create a `Song` component. This is the controller for your entire beat. It takes a `tempo` prop where you specify a BPM, and an `autoplay` prop that configures whether the song should play right away, or wait to press the play button. Set up it like so:

```js
<Song tempo={90}>

</Song>
```

##### Personal note

You can access and set your tempo in the Generic Settings / Harmony and Tempo sections.
I decided to focus a big part of my week of work on the harmonic set up feature : the user can set the root not and the kind of scale he want to use. You can set this up before your song, but also during your song, which will be automatically transposed. I'm really happy about this feature, that is a bit complicated to set up, especially for the chords sections, where I had to store all the informations about music theory (all the major and minor scale, but also the degrees, and many other complex musical things).

This is how this part looks.

#### Sequencer


Your `Sequencer`'s are what you use to define a looping section. They take two props. The first `resolution` is the resolution of steps in your sequence array. This defaults to `16`, which is a sixteenth note. The second is `bars` which is how many bars the sequencer sequences before it loops. You can have multiple sequencers in your song, and the main Song loop is based upon the sequencer with the largest number of bars. Here is an example:

```js
<Song tempo={90}>
  <Sequencer resolution={16} bars={1}>

  </Sequencer>
</Song>
```

##### Personal note

I decided to use a very common way to play with the sequencer in electronic music : a step sequencer, with a grid.
This is how it looks for the drums : <img src="https://media.giphy.com/media/3og0IQ35BXvFtubYyI/giphy.gif"  width="800"/>

For the chords : <img src="https://media.giphy.com/media/3og0ICiMDQArt07TpK/giphy.gif"  width="800"/>

For the bass :<img src="https://media.giphy.com/media/xUA7bhJ1RB7bZ9IyM8/giphy.gif"  width="800"/>

Once you have a `Song` and a `Sequencer` component, you can add instruments to your `Sequencer`. Lets take a look at how these work:

## Instruments

#### Sampler

The sampler component is used to play audio samples. To use it, you must at very least provide two props, `sample` and `steps`.`sample` is a path to an audio file, and `steps` is an array of indexes that map to the steps available based upon the `resolution` and `bars` props of your sequencer. So if you wanted a 4/4 kick line, you would do this:

```js
<Song tempo={90}>
  <Sequencer resolution={16} bars={1}>
    <Sampler
	  sample="/samples/kick.wav"
	  steps={[0, 4, 8, 12]}
    />
  </Sequencer>
</Song>
```

You can also provide an array for a step, where the second value is a tuning, from -12 to 12.

#### Synth

The `Synth` component is used to create an oscillator and play it on steps, just like the `Sampler` does. To use it, you must provide two props, `type` and `steps`. Valid types are `sine`, `square`, `triangle` and `sawtooth`. The `Synth` component also takes an `envelope` prop, where you can specify your ASDR settings. The shape of the `step` prop is a bit different for the `Synth` component, as you must specify an array in the format of `[ step, duration, note || [notes] ]`. The `duration` portion specifies duration in steps. The `note` portion is a string of a musical note and octave like "a4" or "c#1", and for chords, can be an array of the same notes. This would look like:

```js
<Song tempo={90}>
  <Sequencer resolution={16} bars={1}>
    <Synth
      type="square"
	  steps={[
	    [0, 2, "c3"],
	    [8, 2, ["c3", "d#3", "f4"]]
	  ]}
    />
  </Sequencer>
</Song>
```

#### Monosynth

The `Monosynth` component is a `Synth` component, but it only plays one note at a time. It also has a `glide` prop that specifies portamento length. So if two notes overlap, the monosynth glides up to the next value on that duration. Check out how:

```js
<Song tempo={90}>
  <Sequencer resolution={16} bars={1}>
    <Monosynth
      glide={0.5}
      type="square"
      steps={[
        [0, 5, "c3"],
        [4, 4, "c4"],
      ]}
    />
  </Sequencer>
</Song>
```

## Effects

There are a ton of new effects added in 1.0.0. You can compose effect chains by wrapping effects around your instruments. Here is an example of how you would do that:

```js
<Song tempo={90}>
  <Sequencer resolution={16} bars={1}>
    <Reverb>
      <Delay>
        <Monosynth
          steps={[
            [0, 4, "c3"],
            [4, 4, "c4"],
          ]}
        />
      </Delay>
    </Reverb>
  </Sequencer>
</Song>
```


## API

### Top Level

---

#### \<Song />

**autoplay** (_boolean_) : Whether the song should start playing automatically

**tempo** (_number_) : Your song tempo

--

#### \<Sequencer />

**bars** (_number_) : Number of bars in your sequence

**resolution** (_number_) : Step resolution for your sequence

### Intruments

---

#### \<Monosynth />

**busses** (_array_) : An array of `Bus` id strings to send output to

**envelope** (_object_) : An object specifying envelope settings

```js
envelope={{
  attack: 0.1,
  sustain: 0.3,
  decay: 20,
  release: 0.5
}}
```

**gain** (_number_) : A number specifying instrument gain

**glide** (_number_) : Portamento length for overlapping notes

**steps** (_array_) : Array of step arrays for the notes to be played at

```js
steps={[
  [0, 2, "a2"]
]}
```

**transpose** (_number_) : Positive or negative number for transposition of notes

**type** (_string_) : Oscillator type. Accepts `square`, `triangle`, `sawtooth` & `sine`

--

#### \<Sampler />

**busses** (_array_) : An array of `Bus` id strings to send output to

**detune** (_number_) : A number (in cents) specifying instrument detune

**gain** (_number_) : A number specifying instrument gain

**sample** (_number_) : Step resolution for your sequence

**steps** (_array_) : Array of step indexes for the sample to be played at. Accepts arrays for steps in order to provide a second argument for index based detune (in between -12 & 12).

--

#### \<Synth />

**busses** (_array_) : An array of `Bus` id strings to send output to

**envelope** (_object_) : An object specifying envelope settings

```js
envelope={{
  attack: 0.1,
  sustain: 0.3,
  decay: 20,
  release: 0.5
}}
```

**gain** (_number_) : A number specifying instrument gain

**steps** (_array_) : Array of step arrays for the notes to be played at. Accepts in array in the `[ step, duration, note || [notes] ]` format.

```js
// single note
steps={[
  [0, 2, "a2"]
]}

// chord
steps={[
  [0, 2, ["c2", "e2", "g2"]]
]}
```

**transpose** (_number_) : Positive or negative number for transposition of notes

**type** (_string_) : Oscillator type. Accepts `square`, `triangle`, `sawtooth` & `sine`


### Effects

---

#### \<Bitcrusher />

**bits** (_number_)

**bufferSize** (_number_)

**normfreq** (_number_)


--

#### \<Chorus />

**bypass** (_number_)

**delay** (_number_)

**feedback** (_number_)

**rate** (_number_)


--



#### \<Delay />

**bypass** (_number_)

**cutoff** (_number_)

**delayTime** (_number_)

**dryLevel** (_number_)

**feedback** (_number_)

**wetLevel** (_number_)


--

#### \<Filter />

**Q** (_number_)

**frequency** (_number_)

**gain** (_number_)

**type** (_string_)


--

#### \<Gain />

**amount** (_number_)


--


#### \<Reverb />

**bypass** (_number_)

**dryLevel** (_number_)

**highCut** (_number_)

**impulse** (_string_)

**level** (_number_)

**lowCut** (_number_)

**wetLevel** (_number_)


### Special

---

#### \<Analyser />

**fftSize** (_number_) : FFT Size value

**onAudioProcess** (_function_) : Callback function with audio processing data

**smoothingTimeConstant** (_number_) : Smoothing time constant

--


## License

[MIT License](http://opensource.org/licenses/MIT)
