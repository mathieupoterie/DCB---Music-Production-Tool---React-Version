<h1 align="center">DCB - Music Production Tool</h1>

<h4 align="center">
  Final project at SPICED ACADEMY
</h4>

***

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
I created this website during the last week of my SPICED Academy bootcamp, in June 2017 ending in Berlin.

<br>
I wanted to create a music instrument online, a bit different from what already exist. I used the idea of the sequencer to synchronise 3 instruments together :
    <ul><li><b>Drums</b> : this drums sequencer is pretty classical, and easy to use. Just click on the sound and step you want on the table, and you will have some sound ! Just play with it and after few seconds, you will get the concept !</li>
    <li><b>Chords</b> : the more challenging part of the project ! I had to use my music theory knowledge to make it work. Based on the scale and root note you selected (ex : A minor), you can use this sequencer to play chords that will fit to those settings. You can choose between seven different chords, each one can add a different feeling and emotion to your composition.</li>
    <li><b>Bass</b> : this bass sequencer is quite simple, but you can obtain very rich sounds using the saw type, attack, decay and glide parameters.</li>
    </ul>

The first section, <em>Generic Settings</em>, contains the most important settings of your songs (<em>tempo, root, scale</em>), and also effects that you will apply to the three instruments (<em>delay, reverb, filter, bitcrusher</em>).
Each of those instruments has different effects you can experiment. The <em>Visualiser</em> is a bonus feature to help you see your sound spectrum, from the lowest frequencies, on the left, to the highest, on the right.

I worked on this project using "react music" (https://github.com/FormidableLabs/react-music). Here are, from their documentation, the basic concepts I used to create this DCB Instrument.

## Basic Concepts

#### Song

The first thing you want to do is create a `Song` component. This is the controller for your entire beat. It takes a `tempo` prop where you specify a BPM, and an `autoplay` prop that configures whether the song should play right away, or wait to press the play button. Set up it like so:

```js
<Song tempo={90}>

</Song>
```

#### Personal note

You can access and set your tempo in the <em>Generic Settings / Harmony and Tempo</em> sections.
I decided to dedicate a big part of my week to work on the harmonic set up feature : the user can set the root not and the kind of scale he want to use. You can set this up before your song, but also during your song, which will be automatically transposed.
<br>I'm really happy about this feature, that is a bit complicated to set up, especially for the chords sections, where I had to store all the informations about music theory (all the major and minor scale, but also the degrees, and many other complex musical things).

This is how this part looks :
<br>
<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956221-1515afc0-6319-11e7-944c-bebcb967a7e5.gif"  width="800"/></p>
<br>


#### Sequencer


Your `Sequencer`'s are what you use to define a looping section. They take two props. The first `resolution` is the resolution of steps in your sequence array. This defaults to `16`, which is a sixteenth note. The second is `bars` which is how many bars the sequencer sequences before it loops. You can have multiple sequencers in your song, and the main Song loop is based upon the sequencer with the largest number of bars. Here is an example:

```js
<Song tempo={90}>
  <Sequencer resolution={16} bars={1}>

  </Sequencer>
</Song>
```

#### Personal note

I decided to use a very common way to play with the sequencer in electronic music : a step sequencer, with a grid.
This is how it looks on the drums : <p align="center"><img src="https://user-images.githubusercontent.com/26822768/27954851-2ce97a02-6312-11e7-9c11-68305ec4d836.gif"  width="800"/></p>

On the chords : <p align="center"><img src="https://user-images.githubusercontent.com/26822768/27954812-066031e6-6312-11e7-9118-a65848070428.gif"  width="800"/></p>

On the bass :<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27954845-27bbf078-6312-11e7-87c0-7af892967c1d.gif"  width="800"/></p>


You can clear each instrument individually, with the <em>Clear Instrument</em> button :
<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956205-001b634e-6319-11e7-8f88-cae96f266458.gif"  width="800"/></p>

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

#### Personal note
I used this Sampler for making the <em>Drums</em> instrument.
Like each instrument, the user can set the `resolution` and the number of `bars` of the <em>Drums</em>.

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


#### Personal note
Like each instrument, the user can set the `resolution` and the number of `bars` of the drums in the <em>Settings</em> section of the instrument.
I used two Synth for creating a poly synthesizer with 2 oscillators. You can set the `type` of saw of each oscillator and their volume (`gain`).
<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956746-6ed5ef78-631b-11e7-9de3-f45be4e029a4.gif"  width="800"/></p>
You can play chords by selecting a degree (in Roman number). In music theory, a degree (chord) refers to the position of a particular chord on a scale relative to the tonic, the first and main note of the scale from which each octave is assumed to begin. Each chords is composed of three notes. It's quite new to conceive electronic in that way, and that's definitely the part I am the most proud of. You can play nice chords, make great pattern without knowing anything to music theory.


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

#### Personal note
Like each instrument, the user can set the `resolution` and the number of `bars` of the <em>Drums</em>.
In the [Intruments](#intruments) part, you can see all the settings you can use for the `Monosynth`. For my bass, i used the `attack` and the `decay` from the `envelope`, the `type` of saw and the `glide`. With those four settings you can create many different bass sounds.

<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956199-fb4986ac-6318-11e7-9492-e49938ac27b5.gif"  width="800"/></p>

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

#### Personal note
I used the bit crusher on each instrument to create a video-game like effect.
The value `4` is the most destructive you can choose on my website.

<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956769-88ff9d18-631b-11e7-9f60-25dfe9aa8282.gif"  width="800"/></p>

--

#### \<Chorus />

**bypass** (_number_)

**delay** (_number_)

**feedback** (_number_)

**rate** (_number_)

#### Personal note
I used the Chorus to add more complexity to the <em>Chords</em> instrument. I wanted this website to be quite easy to use, that's why i decided to set static values for the `delay`, `feedback` and just let the user have fun with the value of the `rate`.

<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27957203-a7e9119e-631d-11e7-9e6e-c35b7de9107c.gif"  width="800"/></p>


--



#### \<Delay />

**bypass** (_number_)

**cutoff** (_number_)

**delayTime** (_number_)

**dryLevel** (_number_)

**feedback** (_number_)

**wetLevel** (_number_)

#### Personal note
I decided to use this delay for all the instruments at the same time. That's why you can find it in the <em>Generic Settings</em> section. I had to work a bit for making an easy to use feature, especially about the `delayTime`. I had to find the value equals to precise durations (for example 1/4 note, or 1/32 note).

<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956770-88ffc126-631b-11e7-9b88-0cf75d8fe13c.gif"  width="800"/></p>


--

#### \<Filter />

**Q** (_number_)

**frequency** (_number_)

**gain** (_number_)

**type** (_string_)

#### Personal note
You can use the filters for filtering the frequencies. You will find one in the <em>Generic Settings</em> section, and one in the <em>Chords</em> section. I decided to keep just two of the `type` of filters you can choose, the most popular ones, to make it easy to use for non-musicians.
<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956771-89006b12-631b-11e7-9baa-28a5727818a6.gif"  width="800"/></p>



--

#### \<Gain />

**amount** (_number_)

#### Personal note
I used gain for the severals volume buttons you can find in the <em>Settings</em> section of the instruments.

--


#### \<Reverb />

**bypass** (_number_)

**dryLevel** (_number_)

**highCut** (_number_)

**impulse** (_string_)

**level** (_number_)

**lowCut** (_number_)

**wetLevel** (_number_)

#### Personal note
I had to choose between all those parameters for making an efficient effect, easy to use.
I mixed the wetLevel and the dryLevel, so that when `wetLevel = 100`, `dryLevel = 0` and vice versa.
The level, the impulse and the bypass have static values.
<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956772-8905c4f4-631b-11e7-9da7-d1456958443e.gif"  width="800"/></p>


### Special

---

#### \<Analyser />

**fftSize** (_number_) : FFT Size value

**onAudioProcess** (_function_) : Callback function with audio processing data

**smoothingTimeConstant** (_number_) : Smoothing time constant

#### Personal note
I used the built-in <em>Visualizer</em>, by <a href="https://github.com/FormidableLabs/react-music">FormidableLabs</a>, that use the <em>Analyser</em>.
<p align="center"><img src="https://user-images.githubusercontent.com/26822768/27956773-89075670-631b-11e7-91ea-b17e8a8f53b2.gif"  width="800"/></p>


--


## License

[MIT License](http://opensource.org/licenses/MIT)
