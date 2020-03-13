import EmojiButton from '@joeattardi/emoji-button'

function saveSelection() {
	if (window.getSelection) {
		const sel = window.getSelection()
		if (sel.getRangeAt && sel.rangeCount) {
			return sel.getRangeAt(0)
		}
	} else if (document.selection && document.selection.createRange) {
		return document.selection.createRange()
	}
	return null
}

function restoreSelection(range) {
	if (range) {
		if (window.getSelection) {
			const sel = window.getSelection()
			sel.removeAllRanges()
			sel.addRange(range)
		} else if (document.selection && range.select) {
			range.select()
		}
	}
}

function setCaretAfter(element) {
	if (window.getSelection) {
		var range = document.createRange()
		range.setStartAfter(element)

		var selection = window.getSelection()
		selection.removeAllRanges()
		selection.addRange(range)
	}
}

function insertTextAtCursor(text) {
	var sel, range
	if (window.getSelection) {
		sel = window.getSelection()
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0)
			range.deleteContents()
			range.insertNode(range.createContextualFragment(text))
			sel.s
		}
	} else if (document.selection && document.selection.createRange) {
		document.selection.createRange().text = text
	}
}

window.addEventListener('DOMContentLoaded', () => {
	const button = document.querySelector('#native-button')
	const input = document.getElementById('native-contenteditable')
	const picker = new EmojiButton({ style: 'native' })
	let position

	picker.on('emoji', emoji => {
		setTimeout(() => {
			restoreSelection(position)
			insertTextAtCursor(emoji)
		}, 10)
	})

	input.addEventListener('mouseleave', () => {
		position = saveSelection()
	})

	input.addEventListener('keyup', () => {
		position = saveSelection()
	})

	button.addEventListener('click', () => {
		picker.togglePicker(button)
	})
})
